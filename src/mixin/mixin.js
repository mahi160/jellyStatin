export default {
  data() {
    return {
      isDark: false
    };
  },
  methods: {
    darkMode() {
      this.isDark = !this.isDark;
      console.log(`mixin.vue ${this.isDark}`);
    }
  }
};
