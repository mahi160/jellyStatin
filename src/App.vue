<template>
  <div id="app" :class="mode">
    <div id="nav">
      <img id="nav-logo" alt="Vue logo" src="./assets/logo.png" />
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a @click="modeChange()" v-show="!isDark"
        ><img src="./assets/moon.png" alt="dark mode" width="20px"
      /></a>
      <a @click="modeChange()" v-show="isDark"
        ><img src="./assets/sun.png" alt="light mode" width="20px"
      /></a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false
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
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
}

#nav-logo {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
}

.lightMode {
  color: #2c3e50;
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
      color: #2c3e50;

      &.router-link-exact-active {
        color: #5563d0;
      }
    }
  }
}

.darkMode {
  color: #fffff0;
  input {
    color: #fffff0;
    background-color: #353535;
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
      color: #95a5a6;

      &.router-link-exact-active {
        color: #2ecc71;
      }
    }
  }
}
</style>