<template>
  <div class="container-md">
    <template v-if="myTrips.length > 0">
      <h1 class="text-center display-2"><strong>I tuoi Viaggi</strong></h1>
      <div class="row">
        <div class="d-flex align-items-center">
          <div class="tripCard p-2" v-for="(trip, index) in myTrips">
            <Card :trip="trip" :index="index" @deleteTrip="handleDelete" />
            <!-- <RouterLink :to="{ name: 'trip.show', params: { index: index } }">
        <img :src="trip.image" alt="Immagine vacanza" width="300px" />
        <h2>{{ trip.name }}</h2>
        <p>{{ trip.start_date }} - {{ trip.end_date }}</p>
      </RouterLink> -->
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-center display-2">
        <h1>Nessun Viaggio programmato</h1>
      </div>
    </template>

    <RouterLink :to="{ name: 'trip.create' }">
      <div>
        <button class="btn" id="addTrip">
          <i class="bi bi-calendar-plus"></i>
        </button>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  data() {
    return {
      myTrips: []
    }
  },
  components: {
    Card
  },

  methods: {
    handleDelete(index) {
      this.deleteTrip(index)
    },
    deleteTrip(index) {
      this.myTrips.splice(index, 1)
      localStorage.setItem('trips', JSON.stringify(this.myTrips))
      this.fetchTrips
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
  background-color: #3795BD;

  i {
    font-size: 2rem;
    font-weight: 900;
    color: white;
    text-align: center;
  }
}
</style>
