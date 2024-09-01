<template>
  <div id="map" style="width: 100%; height: 300px"></div>
</template>
<script>
import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'

export default {
  data() {
    return {
      selectedLocation: [],
      zoomFactor: 5
    }
  },
  watch: {
    locations: {
      handler() {
        if (this.locations.length > 0) {
          this.selectedLocation = this.locations[0]
          this.markerMap()
        }
      },
      deep: true
    },
    activities: {
      handler() {
        

        this.markerMap()
      },
      deep: true
    },
    selectedMarker: {
      handler() {

        this.zoomFactor = 16
        this.selectedLocation = this.selectedMarker
        this.markerMap()
      },
      deep: true
    },
    selectedDay: {
      handler() {
        if (this.selectedDay !== null) {
          

          if (this.activities[this.selectedDay].length > 0) {
            this.zoomFactor = 16
            
            this.selectedLocation = this.activities[this.selectedDay][0].locationCoordinates
            this.markerMap()
          } else {
            this.genMap()
          }
        }


      },
      deep: true
    }
  },
  props: {
    locations: Array,
    activities: Object,
    selectedMarker: Array,
    selectedDay: Number
  },
  methods: {
    genMap() {
      

      let map = tt.map({
        name: 'map',
        key: 'qicXsxpR2GuZBNAJUJA0XBi1PHp4OzgD',
        container: 'map'
      })
    },
    markerMap() {
      

      let map = tt.map({
        name: 'map',
        key: 'qicXsxpR2GuZBNAJUJA0XBi1PHp4OzgD',
        container: 'map',
        zoom: this.zoomFactor,
        center: this.selectedLocation
      })

      var popupOffsets = {
        top: [0, -70],
        bottom: [0, -40]
        // left: [25, -35],
        // right: [-25, -35]
      }
      if (this.selectedDay != null) {
        this.activities[this.selectedDay].forEach((activity) => {
          let marker = new tt.Marker().setLngLat(activity.locationCoordinates).addTo(map)
          let popup = new tt.Popup({ offset: popupOffsets }).setHTML(
            '<h5>' + activity.name + '</h5><span>' + activity.time + '</span>'
          )
          marker.setPopup(popup).togglePopup()
        })
      } else {
        this.activities.forEach((activity) => {
          activity.forEach((element) => {
            let marker = new tt.Marker().setLngLat(element.locationCoordinates).addTo(map)
            let popup = new tt.Popup({ offset: popupOffsets }).setHTML(
              '<h5>' + element.name + '</h5><span>' + element.time + '</span>'
            )
            marker.setPopup(popup).togglePopup()
          })
        })
      }
    }
  },

  mounted() {
    if (this.selectedDay !== null) {
          
          if (this.activities[this.selectedDay].length > 0) {
            this.zoomFactor = 16
            
            this.selectedLocation = this.activities[this.selectedDay][0].locationCoordinates
            this.markerMap()
          } else {
            this.genMap()
          }
        }
  }
}
</script>

<style lang="scss" scoped>
#map{
  border-radius: 10px;
}
</style>
