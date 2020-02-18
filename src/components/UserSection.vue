<template>
  <div class="basic-section" v-show="!show">
    <!--Users-->
    <caption for="users">
      <h1>Users</h1>
    </caption>

    <b-table
      caption-top
      :head-variant="headVariant"
      :table-variant="tableVariant"
      :dark="dark"
      sticky-header="400px"
      hover
      :fields="fields"
      :items="users"
      style="text-transform:capitalize;"
    >
      <!--Index collumn-->
      <template v-slot:cell(index)="data">
        <span v-if="data.index < 9">0</span>{{ data.index + 1 }}
      </template>

      <!--Username & Admin Badge-->
      <template v-slot:cell(userName)="data">
        {{ data.item.userName }}
        <small v-if="data.item.admin">
          <b-badge pill variant="warning">
            A
          </b-badge>
        </small>
        <small v-else>
          <b-badge pill variant="success">
            U
          </b-badge>
        </small>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "basic-section",
  props: {
    users: Array,
    show: Boolean, //to show this section. default: false.
    dark: Boolean,
    headVariant: String,
    tableVariant: String
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
