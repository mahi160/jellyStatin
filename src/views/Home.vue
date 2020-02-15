<template>
  <div class="home">
    <input-section
      :serverIP.sync="serverIP"
      :serverPort.sync="serverPort"
      :serverAPI.sync="serverAPI"
      :isDark="isDark"
      :show="show"
      :errFetch="errFetch"
      @all-stat="allStats()"
      @submit="submit()"
    ></input-section>
    <basic-section
      :serverIP="serverIP"
      :serverPort="serverPort"
      :serverAPI="serverAPI"
      :systemStats="systemStats"
      :users="users"
      :plugins="plugins"
      :show="show"
      @all-stat="allStats()"
      @submit="submit()"
    ></basic-section>
  </div>
</template>

<script>
// @ is an alias to /src
import InputSection from "@/components/InputSection.vue";
import BasicSection from '@/components/BasicSection.vue'
export default {
  name: "Home",
  components: {
    InputSection,
    BasicSection
  },
  data() {
    return {
      show: true, //Show data
      errFetch: false, //Fetching error
      activityErr: false, //user_stat not found
      isAdmin: true, //is user admin?
      isDark: false,

      serverIP: "",
      serverPort: "",
      serverAPI: "",

      systemStats: [],
      users: [],
      movies: [],
      tvShows: [],
      musics: [],
      others: [],
      plugins: []
    };
  },
  methods: {
    submit: function() {
      if (this.serverIP && this.serverAPI && this.serverPort) {
        this.show = !this.show;
        this.activityErr = false;
      } else {
        this.errFetch = true;
      }
    },
    allStats: function() {
      const url = {
        ItemCount: `${this.serverIP}:${this.serverPort}/Items/Counts?api_key=${this.serverAPI}`,
        Users: `${this.serverIP}:${this.serverPort}/Users?api_key=${this.serverAPI}`,
        Plugins: `${this.serverIP}:${this.serverPort}/emby/Plugins?api_key=${this.serverAPI}`,
        SystemInfo: `${this.serverIP}:${this.serverPort}/System/Info?api_key=${this.serverAPI}`,
        LastActivity: `${this.serverIP}:${this.serverPort}/user_usage_stats/user_activity?api_key=${this.serverAPI}`,
        Artists: `${this.serverIP}:${this.serverPort}/Artists?api_key=${this.serverAPI}`
      };
      //Fetching System Info//
      fetch(url.SystemInfo)
        .then(res => {
          return res.json();
        })
        .then(data => {
          var temp = [];
          temp.push({
            name: data.ServerName,
            version: data.Version,
            update: data.SystemUpdateLevel,
            OS: data.OperatingSystem + " " + data.SystemArchitecture,
            _rowVariant: "danger"
          });

          this.systemStats = temp;
        });

      //Fetching Plugins//
      fetch(url.Plugins)
        .then(res => {
          return res.json();
        })
        .then(data => {
          var temp = [];
          for (let i = 0; i < data.length; i++) {
            temp.push({
              name: data[i].Name,
              version: data[i].Version,
              description: data[i].Description
            });
          }
          this.plugins = temp;
        });

      //Fetching Users//
      fetch(url.Users)
        .then(res => {
          return res.json();
        })
        .then(data => {
          var temp = [];

          //Date Conversion Function//
          function dateCon(time) {
            var date = new Date(Date.parse(time));
            var a = new Date().getTime();
            var b = date.getTime();
            var diff_min = Math.floor((a - b) / 60000);
            var diff_hr = Math.floor(diff_min / 60);
            var diff_day = Math.floor(diff_hr / 24);
            var diff_month = Math.floor(diff_day / 30);
            var diff_year = Math.floor(diff_month / 12);
            return (
              (diff_min < 0 && "In the future!") ||
              (diff_min < 1 && "just now") ||
              (diff_min < 60 && `${diff_min} min ago`) ||
              (diff_hr < 24 &&
                `${diff_hr} hr ${diff_min - diff_hr * 60} min ago`) ||
              (diff_day < 31 &&
                `${diff_day} days ${diff_hr - diff_day * 24} hr ago`) ||
              (diff_month < 12 &&
                `${diff_month} months ${diff_day -
                  diff_month * 30} days ago`) ||
              (diff_year < 10 &&
                `${diff_year} years ${diff_month -
                  diff_year * 12} months ago`) ||
              (diff_year >= 10 && "A Long Time Ago!")
            );
          }

          for (let i = 0; i < data.length; i++) {
            let x = [];
            x[i] = dateCon(data[i].LastActivityDate);
            console.log(x[i]);
            let y = [];
            y[i] = data[i].Policy.IsAdministrator;
            if (y[i]) {
              var color = [];
              color[i] = "success";
            } else {
              color[i] = "";
            }

            temp.push({
              userName: data[i].Name,
              LastSeen: x[i],
              admin: y[i],
              _rowVariant: color[i]
            });
          }
          this.users = temp;
        });

      //Fetching Count Info//
      fetch(url.ItemCount)
        .then(res => {
          return res.json();
        })
        .then(data => {
          let tempMo = [];
          tempMo.push({
            Movies: data.MovieCount,
            BoxSets: data.BoxSetCount
          });
          this.movies = tempMo;

          let tempSe = [];
          tempSe.push({
            Series: data.SeriesCount,
            Episodes: data.EpisodeCount
          });
          this.tvShows = tempSe;

          let tempMu = [];
          tempMu.push({
            Songs: data.SongCount,
            albums: data.AlbumCount,
            artists: data.ArtistCount,
            musicVideos: data.MusicVideoCount
          });
          this.musics = tempMu;

          let tempOt = [];
          tempOt.push({
            Books: data.BookCount,
            Trailers: data.TrailerCount
          });
          this.others = tempOt;
        });
    }
  },
  computed: {
    serverIPcom() {
      return this.serverIP;
    }
  }
}
</script>
