<template>
  <div class="basic-section">
    <b-container v-show="!show">
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

      <!--Basic Section-->
      <b-row class="mt-3">
        <!--Left Side-->
        <b-col lg="6" class="text-center">
          <!--Users-->
          <caption for="users">
            <h1>Users</h1>
          </caption>
          <b-table
            caption-top
            outlined
            head-variant="light"
            table-variant="primary"
            sticky-header="400px"
            hover
            :fields="fields"
            :items="users"
            style="text-transform:capitalize;"
          >
            <!-- A virtual column -->
            <template v-slot:cell(index)="data">
              <span v-if="data.index < 9">0</span>{{ data.index + 1 }}
            </template>
            <!-- A custom formatted column -->
            <template v-slot:cell(userName)="data">
              {{ data.item.userName }}
              <small v-if="data.item.admin"
                ><b-badge pill variant="danger">A</b-badge></small
              >
              <small v-else><b-badge pill variant="primary">U</b-badge></small>
            </template>
          </b-table>
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
    users: Array,
    show: Boolean //to show this section. default: false.
  },
  data() {
    return {
      //fields for user table
      fields: [
        "index",
        //with admin badge
        { key: "userName", label: "Username" },
        "lastSeen"
      ]
    };
  },
  methods: {
    submit: function() {
      this.$emit("submit");
    },
    allStats: function() {
      //will fire the function (in home) to fetch and populate data
      this.$emit("all-stat");
    }
  }
};
</script>
