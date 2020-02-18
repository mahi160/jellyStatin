<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This is an application for showing some basic statics of your
      <em
        ><a href="https://jellyfin.org/" target="_blank">Jellyfin server</a></em
      >.
    </p>
    <p>
      It is built on <em>Vue.js</em>, <em>Bootstrapvue</em> and
      <em>Electron.js</em>. You can find the source code at
      <a href="">Gitlab</a>
    </p>

    <b-container>
      <h3>What it can do?</h3>
      <b-list-group dark class="list">
        <b-list-group-item v-for="can in cans" :key="can.id">{{ can.name }}</b-list-group-item>
      </b-list-group>

      <h3>What it can&#39;t do?(aka: Future plan)</h3>
      <b-list-group dark class="list">
        <b-list-group-item v-for="can in cans" :key="can.id">{{ can.name }}</b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      cans:[
        {
          id: 1,
          name: "Show basic system info"
        },
        {
          id: 2,
          name: "Show basic user info"
        }
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.list{
  width: 400px;
  margin: auto;
}
a {
  color: #5563d0;
}
</style>
