<template>
  <div class="container-fluid tripsContainer">
    <div class="overlay"></div>
    <div class="backG">
      <img class="w-100 h-100" :src="imgArray[this.counter]" alt="" />
    </div>
    <template v-if="myTrips.length > 0">
      <!--   <h1 class="text-center display-2"><strong>I tuoi Viaggi</strong></h1> -->
      <div class="row">
        <div class="d-flex  cardContainer">
          <div class="tripCard p-3" v-for="(trip, index) in myTrips" :key="trip">
            <Card :trip="trip" :index="index" @deleteTrip="handleDelete" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="textContainer">
        <h1>Organizza il tuo prossimo viaggio insieme a noi</h1>
      </div>
    </template>

    <RouterLink :to="{ name: 'home' }">
      <div>
        <button class="btn" id="addTrip">
          <i class="bi bi-calendar-plus"></i>
        </button>
      </div>
    </RouterLink>
  </div>
  <DeletionModal v-if="deletionModal" @deleteConfirmation="deleteTrip(selectedTrip)" :modalSubject=modalSubject />
</template>

<script>
import Card from '../components/Card.vue'
import DeletionModal from '../components/DeletionModal.vue'
import londra from '../assets/londra.jpg'
import ny from '../assets/ny.jpg'
import sanFrancisco from '../assets/sanFrancisco.jpg'

export default {
  data() {
    let counter = 0
    let imgArray = [sanFrancisco, londra, ny]
    return {
      myTrips: [],
      counter,
      imgArray,
      deletionModal: false,
      selectedTrip: 0,
      modalSubject: 'il viaggio'
    }
  },
  components: {
    Card, DeletionModal
  },

  methods: {
    handleDelete(index) {
      this.deletionModal = true;
      this.selectedTrip = index
    },
    deleteTrip(selectedTrip) {
      this.myTrips.splice(selectedTrip, 1)
      localStorage.setItem('trips', JSON.stringify(this.myTrips))
      this.fetchTrips
      this.deletionModal = false
    },
    fetchTrips() {
      let trips = localStorage.getItem('trips')

      if (trips) {
        this.myTrips = JSON.parse(trips)
      }
    }
  },
  mounted() {
    this.fetchTrips()
  }
}
</script>

<style lang="scss">
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

#addTrip {
  width: 5vw;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #3995bcbb;
  z-index: 999;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #3795bd;
  }

  i {
    font-size: 2rem;
    font-weight: 900;
    color: white;
    text-align: center;
  }
}

.container-fluid {

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgb(0 0 0 / 40%);
    top: 0;
    left: 0;
  }

  .backG {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 997;
    }
  }

  .cardContainer {
    display: flex;
    z-index: 999;
    flex-wrap: wrap;
    height: calc(100vh - 200px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tripCard {
    z-index: 999;
    width: calc(100% / 4);
    height: 242px;
  }
}

.tripsContainer {
  height: calc(100vh - 80px);
  position: relative;
  padding: 20px 60px !important;
}

.textContainer {
  position: absolute;
  color: white;
  z-index: 999;
  width: 50vw;
  height: calc(100% - 80px);
  display: flex;
  align-items: flex-end;
  justify-content: center;


  h1 {
    font-size: 60px;
  }
}
</style>
