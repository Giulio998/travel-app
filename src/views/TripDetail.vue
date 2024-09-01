<template>
  <div class="generalContainer">
    <div class="overflow"></div>
    <img class="w-100 h-100" :src="sanFrancisco" alt="image" />
    <div class="custom-container ms-5">
      <div class="row p-2 mt-4">
        <div class="col-6 d-flex flex-column p-3 infoContainer">
          <div class="tripCard d-flex mb-3">
            <div class="cardBody">
              <h1 class="text-white">{{ myTrip.name }}</h1>
              <h5 class="text-white">Data Partenza: {{ myTrip.start_date }}</h5>
              <h5 class="text-white"><strong>Data Ritorno:</strong> {{ myTrip.end_date }}</h5>
              <h5 v-if="clickedActivityName !== ''" class="text-white">Nome Attività: {{ clickedActivityName }}</h5>
              <h5 v-if="clickedActivityAddress !== ''" class="text-white">Luogo Attività: {{ clickedActivityAddress }}
              </h5>
            </div>
          </div>
          <div id="mapContainer">
            <Map :key="myTrip" :locations="locations" :activities="myTrip.activities" :selectedMarker="selectedMarker"
              :selectedDay="selectedDay"></Map>
          </div>
        </div>
        <div class="col-6 d-flex flex-column plannerContainer">
          <Planner :days="myTrip.days" :myTrip="myTrip" @fetchTrips="this.fetchTrips()"
            @locationZoom="handleLocationZoom" @selectDay="handleSelectDay"></Planner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import Planner from '../components/Planner.vue'
import Map from '../components/Map.vue'
import sanFrancisco from '@/assets/sanFrancisco.jpg'

export default {
  data() {
    return {
      store,
      myTrip: [],
      locations: [],
      selectedMarker: [],
      selectedDay: null,
      sanFrancisco,
      clickedActivityName: '',
      clickedActivityAddress: '',
    }
  },

  methods: {
    handleSelectDay(n) {
      this.selectDay(n)
    },
    selectDay(n) {
      console.log(n)

      if (this.selectedDay == n - 1) {
        this.selectedDay = null
      } else {
        this.selectedDay = n - 1
      }
    },
    handleLocationZoom(n, index) {
      this.getCurrentMarker(n, index)
    },
    getCurrentMarker(n, index) {
      this.selectedMarker = this.myTrip.activities[n - 1][index].locationCoordinates
    },
    fetchTrips() {
      this.locations = []
      let trips = localStorage.getItem('trips')
      if (trips) {
        const myTrips = JSON.parse(trips)
        let currentUrl = window.location.href
        let tripId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
        console.log(tripId)
        this.myTrip = myTrips[tripId]
      }
    },
    retrieveMarkers(activities) {
      activities.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.locationCoordinates) {
            this.locations.push(item.locationCoordinates)
          }
        })
      })
    },
    convertData(formatoISO) {
      let [anno, mese, giorno] = formatoISO.split('-')
      return `${giorno}/${mese}/${anno}`
    }
  },
  components: { Planner, Map },

  mounted() {
    this.fetchTrips()
  }
}
</script>

<style lang="scss" scoped>
.generalContainer {
  width: 100vw;
  height: calc(100vh - 80px);
  object-fit: cover;
  position: absolute;
  z-index: 997;

  .img {
    object-fit: cover;
  }
}

.infoContainer {
  border-radius: 15px;
  background-color: #ffffff44;
  backdrop-filter: blur(8px);
  position: absolute;
  left: 0;
  width: 47%;
  height: fit-content;
}

.plannerContainer {
  height: fit-content;
}

.custom-container {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 90%;
}

.overflow {
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.163);
  position: absolute;
  top: 0;
  z-index: 998;
}

.row {
  overflow-y: auto;
  height: calc(100vh - 132px);
  display: flex;
  justify-content: end;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
