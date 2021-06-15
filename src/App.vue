<template>
  <Navbar />
  <router-view
    class="body-content"
    :class="{ body_content__small: scrollPosition > 50 }"
  />
  <vue-progress-bar />
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data: function () {
    return {
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>


<style>
body {
  margin: 0 !important;
}
.body-content {
  min-height: calc(100vh);
  margin-top: 100px;
  z-index: 99;
}
.body_content__small {
  min-height: calc(100vh);
  margin-top: 71px;
  z-index: 99;
}
#app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
