<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div v-for="n in days" :key="n" class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapseOne-` + n" aria-expanded="false" :aria-controls="`flush-collapseOne-` + n"
          @click="emitDay(n)">
          GIORNO {{ n }}
        </button>
      </h2>
      <div :id="`flush-collapseOne-` + n" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <template v-if="myTrip.activities">
            <div class="row mb-3">
              <div class="col-8">
                <div class="row">
                  <div class="col-4 ps-2">
                    <h5 class="subtitle">Attività</h5>
                  </div>
                  <div class="col-4 ps-2">
                    <h5 class="subtitle">Orario</h5>
                  </div>
                  <div class="col-4 ps-2">
                    <h5 class="subtitle pe-0">Note</h5>
                  </div>
                </div>

              </div>
            </div>
            <template v-for="(activity, index) in myTrip.activities[n - 1]" :key="activity">
              <div class="row justify-content-center mb-1 p-2 activityContainer">
                <div class="col-8">
                  <div class="row activityRow" @click="emitData(activity.name, activity.locationName, n, index)">
                    <div class="col-4 m-0 ps-2"><strong>{{ activity.name }}</strong></div>
                    <div class="col-4 m-0 ps-2">{{ activity.time }}</div>
                    <div class="col-4 m-0 ps-2">{{ truncate(activity.note) }}</div>

                  </div>
                </div>
                <div class="col-4 d-flex justify-content-end px-0 align-items-center">
                  <button type="button" class="btn border-primary ms-1 modifyBtn" @click="editActivity(n, index)">
                    Modifica
                  </button>
                  <button type="button" class="btn border-danger ms-1 deleteBtn" @click="modalSetter(index, n)">
                    Elimina
                  </button>
                </div>
              </div>
            </template>

            <div class="col-1 mt-3">
              <button type="button" class="btn btn-primary rounded-pill mx-auto" @click="openModal(n)">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </template>
        </div>
      </div>
      <!-- MODAL -->
    </div>
    <Modal v-if="modalShow" :activity="activity" :n="currentN" :myTrip="myTrip" @fetchTrips="this.$emit('fetchTrips')">
    </Modal>
    <DeletionModal v-if="deletionModal" :modalSubject=modalSubject
      @activityDeleteConfirmation="deleteActivity(selectedDay, selectedActivity)" />
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import DeletionModal from '../components/DeletionModal.vue';

export default {
  data() {
    return {
      activity: {
        id: null,
        name: '',
        time: '',
        note: '',
        locationName: '',
        locationCoordinates: []
      },
      modalShow: false,
      currentN: null,
      selectedActivity: 0,
      selectedDay: 0,
      deletionModal: false,
      modalSubject: `l'attività`
    }
  },
  emits: ['fetchTrips', 'locationZoom', 'selectDay'],
  props: { days: Number, myTrip: Object },
  components: {
    Modal, DeletionModal
  },
  /* "deleteActivity(n, index)" */

  methods: {
    modalSetter(index, n) {
      this.selectedActivity = index;
      this.selectedDay = n;
      this.deletionModal = true
    },
    emitDay(n) {
      this.$emit('selectDay', n);
      this.$parent.clickedActivityName = '';
      this.$parent.clickedActivityAddress = '';

    },
    emitData(activityName, activityLocation, n, index) {
      this.$emit('locationZoom', n, index),


        this.$parent.clickedActivityName = activityName,
        this.$parent.clickedActivityAddress = activityLocation

    },

    truncate(note) {
      if (note.length > 18) {
        console.log(note.length);

        return note.slice(0, 18) + '...'

      } else {
        return note
      }
    },


    openModal(day) {
      let modal = document.getElementById('activity-modal-' + day)
      this.modalShow = true
      this.currentN = day
    },

    editActivity(n, here) {
      let index = n - 1
      let activity = this.myTrip.activities[index][here]
      this.activity = { ...activity }
      this.openModal(n)
    },
    deleteActivity(n, activity) {
      console.log('n', n)

      console.log(activity)
      let index = n - 1
      this.myTrip.activities[index].splice(activity, 1)
      let trips = localStorage.getItem('trips')
      const myTrips = JSON.parse(trips)
      let currentUrl = window.location.href
      let tripId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
      myTrips[tripId] = this.myTrip
      localStorage.setItem('trips', JSON.stringify(myTrips))
      this.deletionModal = false

      this.$emit('fetchTrips')
    }
  },

  mounted() { }
}
</script>

<style lang="scss" scoped>
.subtitle {
  color: rgba(0, 0, 0, 0.692);
}

.location {
  display: none;
}

.activityRow:hover .location {
  display: block;
}


.btn {
  padding: 2px 6px;
}

.deleteBtn {
  height: 38px;
  color: white;
  background-color: rgba(255, 0, 0, 0.387);

  &:hover {
    background-color: rgba(255, 0, 0, 0.65);
  }
}

.modifyBtn {
  height: 38px;
  color: white;
  background-color: rgba(0, 166, 255, 0.387);
  margin-right: 10px;

  &:hover {
    background-color: #3795bdc4;
  }
}

.activityContainer {
  border: 1px solid #22222233;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: aliceblue;
  }
}
</style>
