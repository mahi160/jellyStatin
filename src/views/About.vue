<template>
  <div class="home">
    <img alt="Vue logo" height="120px" src="../assets/logo.png" />
    <br /><br />
    <HelloWorld msg="jellyStatin" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
