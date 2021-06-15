<template>
  <div class="navbar" :class="{ navbar_small: scrollPosition > 50 }">
    <img
      class="logo"
      :class="{ logo_small: scrollPosition > 50 }"
      src="https://nashtechglobal.com/wp-content/uploads/2020/04/logo.png"
      alt="logo"
    />
    <div class="navbar-menu">
      <router-link to="/about-us">About us</router-link>
      <router-link to="/product">Product</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
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

<style lang="scss" scoped>
.navbar {
  height: 100px;
  position: fixed;
  width: 100%;

    background: rgba(192, 192, 192, 0.1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  z-index: 100;
}
.navbar_small {
 background: rgba(192, 192, 192, 1);
  height: 71px;
  z-index: 100;
}
.logo {
  width: 51px;
  height: 51px;
  margin-left: 100px;
}
.logo_small {
  width: 41px;
  height: 41px;
  margin-left: 100px;
}
.navbar-menu {
  margin-left: 20px;
  a {
    text-decoration: none;
    padding: 0 10px 0 0;
  }
}
</style>
