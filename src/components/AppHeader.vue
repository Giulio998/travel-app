<script>
export default {
  data() {
    return {}
  },

  computed: {},
  methods: {},
  mounted() {}
}
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-sm-top">
    <div class="container-fluid flex-nowrap navContainer">
      <router-link :to="{ name: 'home' }" class="nav-link navbar-brand" aria-current="page">
        <div class="d-flex align-items-center">
          <img src="../assets/logo.png" alt="logo" class="logo" />
        </div></router-link
      >

      <ul class="navbar-nav d-flex align-items-center flex-nowrap flex-row">
        <li class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link"
            aria-current="page"
            exact-active-class="active"
            >Home</router-link
          >
        </li>
       <!--  <li class="nav-item">
          <router-link
            :to="{ name: 'trip.create' }"
            class="nav-link"
            aria-current="page"
            exact-active-class="active"
            >Aggiungi viaggio</router-link
          >
        </li> -->
        <li class="nav-item">
          <router-link
            :to="{ name: 'trip.myTrips' }"
            class="nav-link"
            aria-current="page"
            exact-active-class="active"
            >I tuoi viaggi</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

.navbar {
  padding: 0 70px !important;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .nav-link {
    padding: 0 5px;
  }

  .navContainer{
    background-color: transparent;
    height: $headerHeight;
  }
}
.logo {
  height: 40px;
  margin-right: 20px;
}

.active {
  color: #42A5FF !important;
  box-shadow: inset 0 -7px 0 #42A5FF;
}

ul {
  width: 100%;
  li {
    font-size: 1.2rem;
    margin-right: 30px;
    line-height: $headerHeight;
    font-size: 16px;
    color: #42A5FF !important;
  }
}

a{
  color: black;

  &:hover{
    color: #42A5FF;
  }
}


</style>
