<template>
  <div class="home">
    <input-section
      :serverIP.sync="serverIP"
      :serverPort.sync="serverPort"
      :serverAPI.sync="serverAPI"
      :isDark="isDark"
      :show="show"
      :errFetch="errFetch"
    ></input-section>
  </div>
</template>

<script>
// @ is an alias to /src
import InputSection from "@/components/InputSection.vue";

export default {
  name: "Home",
  components: {
    InputSection
  },
  data() {
    return {
      serverIP: "",
      serverPort: "",
      serverAPI: "",
      isDark: false,
      show: true,
      errFetch: false
    };
  }
};
</script>
