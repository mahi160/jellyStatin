<template>
  <div id="app" :class="mode">
    <div id="nav">
      <!--Brand-->
      <b-navbar-brand id="nav-logo" href="#">
        <img alt="Jellyfin logo" src="./assets/logo.png" width="40px" />
        JellyStatin
      </b-navbar-brand>

      <!--Link-->
      <span :class="{ active: home, inactive: about }" @click="showHome()">
        Home
      </span>
      |
      <span :class="{ active: about, inactive: home }" @click="showAbout()">
        About
      </span>
      |
      <!--MOON-->
      <a @click="modeChange()" v-show="!isDark">
        <img src="./assets/moon.png" alt="dark mode" width="20px" />
      </a>
      <!--SUN-->
      <a @click="modeChange()" v-show="isDark">
        <img src="./assets/sun.png" alt="light mode" width="20px" />
      </a>
    </div>

    <home v-if="home" :isDark="isDark"></home>

    <about v-else></about>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin.js";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
export default {
  mixins: [mixin],
  components: {
    Home,
    About
  },
  data() {
    return {
      about: false,
      home: true
    };
  },
  computed: {
    mode() {
      return this.isDark ? "darkMode" : "lightMode";
    }
  },
  methods: {
    modeChange: function() {
      this.isDark = !this.isDark;
      console.log(`app.vue ${this.isDark}`);
    },
    showAbout() {
      this.home = false;
      this.about = true;
    },
    showHome() {
      this.home = true;
      this.about = false;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lacquer|Noto+Serif:400,400i,700,700i&display=swap");
#app {
  font-family: "Noto serif", serif, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  padding-bottom: 30px;
}

#nav-logo {
  position: absolute;
  top: 20px;
  left: 20px;
}

.lightMode {
  .inactive {
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: #2c3e50;
  }
  .active {
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: #5563d0;
  }
  background: linear-gradient(
      22.5deg,
      rgba(67, 67, 67, 0.02) 0%,
      rgba(67, 67, 67, 0.02) 29%,
      rgba(47, 47, 47, 0.02) 29%,
      rgba(47, 47, 47, 0.02) 37%,
      rgba(23, 23, 23, 0.02) 37%,
      rgba(23, 23, 23, 0.02) 55%,
      rgba(182, 182, 182, 0.02) 55%,
      rgba(182, 182, 182, 0.02) 69%,
      rgba(27, 27, 27, 0.02) 69%,
      rgba(27, 27, 27, 0.02) 71%,
      rgba(250, 250, 250, 0.02) 71%,
      rgba(250, 250, 250, 0.02) 100%
    ),
    linear-gradient(
      67.5deg,
      rgba(117, 117, 117, 0.02) 0%,
      rgba(117, 117, 117, 0.02) 14%,
      rgba(199, 199, 199, 0.02) 14%,
      rgba(199, 199, 199, 0.02) 40%,
      rgba(33, 33, 33, 0.02) 40%,
      rgba(33, 33, 33, 0.02) 48%,
      rgba(135, 135, 135, 0.02) 48%,
      rgba(135, 135, 135, 0.02) 60%,
      rgba(148, 148, 148, 0.02) 60%,
      rgba(148, 148, 148, 0.02) 95%,
      rgba(53, 53, 53, 0.02) 95%,
      rgba(53, 53, 53, 0.02) 100%
    ),
    linear-gradient(
      135deg,
      rgba(190, 190, 190, 0.02) 0%,
      rgba(190, 190, 190, 0.02) 6%,
      rgba(251, 251, 251, 0.02) 6%,
      rgba(251, 251, 251, 0.02) 18%,
      rgba(2, 2, 2, 0.02) 18%,
      rgba(2, 2, 2, 0.02) 27%,
      rgba(253, 253, 253, 0.02) 27%,
      rgba(253, 253, 253, 0.02) 49%,
      rgba(128, 128, 128, 0.02) 49%,
      rgba(128, 128, 128, 0.02) 76%,
      rgba(150, 150, 150, 0.02) 76%,
      rgba(150, 150, 150, 0.02) 100%
    ),
    linear-gradient(90deg, #fff, #fff);

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.2);
    }
  }
  a {
    color: #5563d0;
  }
}

.darkMode {
  color: #f5f6fa;
  .inactive {
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: #f5f6fa;
  }
  .active {
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    color: #0097e6;
  }
  input {
    color: #f5f6fa;
    background-color: #343a40;
  }

  background: linear-gradient(
      216deg,
      rgba(77, 77, 77, 0.05) 0%,
      rgba(77, 77, 77, 0.05) 25%,
      rgba(42, 42, 42, 0.05) 25%,
      rgba(42, 42, 42, 0.05) 38%,
      rgba(223, 223, 223, 0.05) 38%,
      rgba(223, 223, 223, 0.05) 75%,
      rgba(36, 36, 36, 0.05) 75%,
      rgba(36, 36, 36, 0.05) 100%
    ),
    linear-gradient(
      44deg,
      rgba(128, 128, 128, 0.05) 0%,
      rgba(128, 128, 128, 0.05) 34%,
      rgba(212, 212, 212, 0.05) 34%,
      rgba(212, 212, 212, 0.05) 57%,
      rgba(25, 25, 25, 0.05) 57%,
      rgba(25, 25, 25, 0.05) 89%,
      rgba(135, 135, 135, 0.05) 89%,
      rgba(135, 135, 135, 0.05) 100%
    ),
    linear-gradient(
      241deg,
      rgba(55, 55, 55, 0.05) 0%,
      rgba(55, 55, 55, 0.05) 14%,
      rgba(209, 209, 209, 0.05) 14%,
      rgba(209, 209, 209, 0.05) 60%,
      rgba(245, 245, 245, 0.05) 60%,
      rgba(245, 245, 245, 0.05) 69%,
      rgba(164, 164, 164, 0.05) 69%,
      rgba(164, 164, 164, 0.05) 100%
    ),
    linear-gradient(
      249deg,
      rgba(248, 248, 248, 0.05) 0%,
      rgba(248, 248, 248, 0.05) 32%,
      rgba(148, 148, 148, 0.05) 32%,
      rgba(148, 148, 148, 0.05) 35%,
      rgba(202, 202, 202, 0.05) 35%,
      rgba(202, 202, 202, 0.05) 51%,
      rgba(181, 181, 181, 0.05) 51%,
      rgba(181, 181, 181, 0.05) 100%
    ),
    linear-gradient(92deg, hsl(214, 0%, 11%), hsl(214, 0%, 11%));

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: rgba(256, 256, 256, 0.2);
    }
  }
  a {
    color: #0097e6;
  }
}
</style>
