<template>
  <div class="container">
    <div class="row p-2">
      <div class="col-5 d-flex flex-column">
        <div class="tripCard d-flex mb-3">
          <div class="cardBody">
        
            <h1>{{ myTrip.name }}</h1>
            <h5>Data di inizio : {{ myTrip.start_date }}</h5>
            <h5>Data di fine : {{ myTrip.end_date }}</h5>
          </div>
          <div v-if="myTrip.image" class="cardHead p-1">
            <img :src="myTrip.image" alt="Immagine vacanza" width="300px" max-heigth="150px" />
          </div>
        </div>
        <div id="mapContainer">
          <Map   :key="myTrip" :locations="locations" :activities="myTrip.activities " :selectedMarker="selectedMarker"
          :selectedDay="selectedDay"></Map>
        </div>
      </div>
      <div class="col-7 d-flex flex-column">
        <Planner :days="myTrip.days" :myTrip="myTrip" @fetchTrips="this.fetchTrips()" @locationZoom="handleLocationZoom"
        @selectDay="handleSelectDay"></Planner>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import Planner from '../components/Planner.vue'
import Map from '../components/Map.vue'

import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'

export default {
  data() {
    return {
      store,
      myTrip: [],
      locations: [],
      selectedMarker: [],
      selectedDay: null
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
      // const index = this.selectedDays.indexOf(n)
      // if (index === -1) {
      //   this.selectedDays.push(n)
      // } else {
      //   this.selectedDays.splice(index, 1)
      // }
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
        
        
     /*    this.retrieveMarkers(this.myTrip.activities) */
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
    }
  },
  components: { Planner, Map },

  mounted() {
    this.fetchTrips()
  }
}
</script>

<style lang="scss" scoped></style>

<!-- 
function addMarker(map) { 
  const tt = window.tt; 
  var location = [-121.91595, 37.36729]; 
  var popupOffset = 25; 

  var marker = new tt.Marker().setLngLat(location).addTo(map); 
  var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!"); 
          marker.setPopup(popup).togglePopup(); 
}  -->
