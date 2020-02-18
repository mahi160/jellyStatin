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
      <em href="https://github.com/mahi160/jellyStatin" target="_blank">Github</em>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.list {
  width: 400px;
  margin: auto;
}
</style>
