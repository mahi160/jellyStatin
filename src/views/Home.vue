<template>
  <div class="home">
    <b-container>
      <!--Input Card-->
      <input-section
        :serverIP.sync="serverIP"
        :serverPort.sync="serverPort"
        :serverAPI.sync="serverAPI"
        :show="show"
        :errFetch="errFetch"
        :bgVariant="mode"
        :dark="isDark"
        @all-stat="allStats()"
        @submit="submit()"
      ></input-section>

      <!--Address-->
      <b-row v-show="!show">
        <b-col lg="8" class="mt-3">
          <b id="headLine" style="word-break: break-all;">
            {{ serverIP }}:{{ serverPort }}?api_key={{ serverAPI }}
          </b>
        </b-col>

        <b-col lg="4">
          <b-button variant="success" class="m-2 pt-2" @click="allStats()">
            Refresh
          </b-button>

          <b-button variant="danger" class="m-2 pt-2" @click="submit()">
            Reset
          </b-button>
        </b-col>
      </b-row>

      <!--Left Side-->
      <b-row>
        <b-col lg="6">
          <!--System Info-->
          <main-section
            name="System Info"
            :show="show"
            :items="systemStats"
            :headVariant="mode"
            tableVariant="danger"
            :dark="isDark"
          ></main-section>

          <!--Users-->
          <user-section
            :serverIP="serverIP"
            :serverPort="serverPort"
            :serverAPI="serverAPI"
            :users="users"
            :show="show"
            :headVariant="mode"
            tableVariant="primary"
            :dark="isDark"
            @all-stat="allStats()"
            @submit="submit()"
          ></user-section>
        </b-col>

        <b-col lg="6">
          <!--Plugins-->
          <main-section
            name="Plugins"
            :show="show"
            :items="plugins"
            :headVariant="mode"
            tableVariant="success"
            :dark="isDark"
          ></main-section>
        </b-col>
      </b-row>

      <!--Counts-->
      <main-section
        name="Counts"
        :show="show"
        :items="counts"
        :headVariant="mode"
        tableVariant="info"
        :dark="isDark"
      ></main-section>   
    </b-container>
  </div>
</template>

<script>
import InputSection from "@/components/InputSection.vue";
import UserSection from "@/components/UserSection.vue";
import MainSection from "@/components/MainSection.vue";

export default {
  name: "Home",
  components: {
    InputSection,
    UserSection,
    MainSection
  },
  props: {
    isDark: Boolean
  },
  data() {
    return {
      show: true, //Show data
      errFetch: false, //Fetching error
      activityErr: false, //user_stat not found
      isAdmin: true, //is user admin?

      serverIP: localStorage.IP,
      serverPort: localStorage.Port,
      serverAPI: localStorage.API,

      systemStats: [],
      users: [],
      counts: [],
      movies: [],
      tvShows: [],
      musics: [],
      artField: [
        'index',
        {
          key: 'name',
          sortable: true
        },
        {
          key:'time',
          sortable:true
        }
      ],
      others: [],
      plugins: [],
    };
  },
  methods: {
    submit: function() {
      if (this.serverIP && this.serverAPI && this.serverPort) {
        this.show = !this.show;
        this.activityErr = false;
        this.errFetch = false;
      } else {
        this.errFetch = true;
      }
      localStorage.IP = this.serverIP;
      localStorage.Port = this.serverPort;
      localStorage.API = this.serverAPI;
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
        })
        .catch(err => {
          this.errFetch = true;
          this.show = true;
          console.log("System Info Fetching Error");
          return err;
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
            let y = [];
            y[i] = data[i].Policy.IsAdministrator;

            temp.push({
              userName: data[i].Name,
              lastSeen: x[i],
              admin: y[i]
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
          let tempC = [];
          tempC.push({
            Movies: data.MovieCount,
            BoxSets: data.BoxSetCount,
            Series: data.SeriesCount,
            Episodes: data.EpisodeCount,
            Songs: data.SongCount,
            albums: data.AlbumCount,
            //artists: data.ArtistCount,//API not working
            musicVideos: data.MusicVideoCount,
            Books: data.BookCount
          });
          this.counts = tempC;
        });
      //Artist
      fetch(url.Artists)
        .then(res => {
          return res.json()
        })
        .then(data => {
          for(let i=0; i<data.TotalRecordCount;i++)
          { 
            let x = Math.floor((data.Items[i].RunTimeTicks/10**7)/60);
            let y = ((data.Items[i].RunTimeTicks/10**7)/60 -x)*60;

            this.musics.push({
            name: data.Items[i].Name,
            time: `${x} min ${y.toFixed(0)} sec`
          })
          }
          
        })

    }
  },
  computed: {
    mode() {
      return this.isDark ? "dark" : "light";
    }
  }
};
</script>
