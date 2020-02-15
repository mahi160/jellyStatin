<template>
  <div class="basic-section">
    <b-container v-show="show">
      <!--Address-->
      <b-row>
        <b-col lg="8" class="mt-3">
          <b style="word-break: break-all;">
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

      <!--Basic-->
      <b-row class="mt-3">
        <!--Left Side-->

        <b-col lg="6" class="text-center">
          <caption style="width:250px" for="stats">
            <h1>System Stats</h1>
          </caption>
          <b-table
            caption-top
            head-variant="light"
            table-variant="danger"
            outlined
            striped
            hover
            :items="systemStats"
          ></b-table>

          <!--Users-->
          <caption for="users">
            <h1>Users</h1>
          </caption>
          <b-table
            caption-top
            outlined
            head-variant="light"
            table-variant="primary"
            hover
            :items="users"
            style="text-transform:capitalize;"
          ></b-table>
        </b-col>

        <!--Right Side-->
        <b-col lg="6">
          <caption for="plugins">
            <h1>Plugins</h1>
          </caption>
          <b-table
            id="plugins"
            caption-top
            outlined
            sticky-header="400px"
            head-variant="light"
            table-variant="info"
            striped
            hover
            :items="plugins"
          ></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "basic-section",
  props: {
    serverIP: String,
    serverPort: String,
    serverAPI: String,
    systemStats: Array,
    users: Array,
    plugins: Array,
    show: Boolean
  },
  methods: {
    submit: function() {
      this.$emit("submit");
    },
    allStats: function() {
      this.$emit("all-stat");
    }
  }
};
</script>