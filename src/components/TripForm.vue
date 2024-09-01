<template>
  <div class="container-md">
    <div>
      <div class="pt-2 mb-5">
        <h1 class="">Crea il tuo Viaggio</h1>
      </div>
      <div class="mb-2">
        <label for="name">Nome del viaggio <span class="text-danger">*</span></label>
        <input type="text" placeholder="Nome" id="name" name="name" v-model="this.newTrip.name" required class="w100" />
      </div>
      <div class="mb-2">
        <label for="start_date">Data di inizio <span class="text-danger">*</span></label>
        <input type="date" id="start_date" name="start_date" v-model="newTrip.start_date" required class="w100"
          @input="valiDate()" />
        <div v-if="newTrip.start_date !== '' && newTrip.start_date < formattedDate" class="text-danger">
          La data inserita non è valida
        </div>
      </div>
      <div class="mb-2">
        <label for="end_date">Data di fine <span class="text-danger">*</span></label>
        <input type="date" id="end_date" name="end_date" v-model="newTrip.end_date" required @input="valiDate()"
          class="w100" />
        <div v-if="newTrip.end_date !== '' && newTrip.end_date < newTrip.start_date" class="text-danger">
          La data inserita non è valida
        </div>
      </div>
      <!-- <div class="mb-4">
          <label for="thumbnail">Immagine di copertina</label>
          <input type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg" @change="uploadImage()"
            class="w100 file" />
          <img :src="newTrip.image" width="300px" />
        </div> -->
    </div>
    <div class="btnContainer">
      <button :disabled="unchecked() ? true : false" :class="unchecked() ? 'disabled-btn' : 'btn-bd-primary'"
        class="btn" value="Invia" @click="addTrip()">
        Crea viaggio
      </button>
    </div>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  data() {
    return {
      newTrip: {
        name: '',
        start_date: null,
        end_date: null,
        image: null,
        days: null,
        activities: []
      },

      validated: false,
      myTrips: []
    }
  },

  methods: {
    unchecked() {
      if (this.validated === false || this.newTrip.name == '') {
        return true
      } else {
        return false
      }
    },
    valiDate() {
      if (new Date(this.newTrip.start_date) <= new Date(this.newTrip.end_date)) {
        if (this.newTrip.start_date >= this.formattedDate) {
          this.validated = true
          this.calculateDays()
        } else {
          this.validated = false
        }
      } else {
        this.validated = false
      }
    },
    generateDays() {
      for (let i = 0; i < this.newTrip.days; i++) {
        const dayActivities = []
        this.newTrip.activities.push(dayActivities)
      }
    },
    addTrip() {
      if (this.validated == false) {
        alert('La data di inizio non può essere successiva alla data di fine')
        return
      }
      this.generateDays()
      this.myTrips.push(this.newTrip)
      localStorage.setItem('trips', JSON.stringify(this.myTrips))
      router.push({ path: '/my_trips/' })
    },
    fetchTrips() {
      let trips = localStorage.getItem('trips')

      if (trips) {
        this.myTrips = JSON.parse(trips)
      }
    },
    calculateDays() {
      const start = new Date(this.newTrip.start_date)
      const end = new Date(this.newTrip.end_date)
      const timeDifference = end.getTime() - start.getTime()
      this.newTrip.days = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1
    },
    uploadImage() {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const rawImg = reader.result
        this.newTrip.image = rawImg // Base64-encoded image
        console.log(rawImg) // Base64-encoded image
      }

      reader.readAsDataURL(file)
    },
    getCurrentDateTime() {
      const currentDate = new Date()
      const formattedDate = new Date().toJSON().slice(0, 10)
      this.formattedDate = formattedDate
    }
  },

  mounted() {
    this.fetchTrips(), this.getCurrentDateTime()
  }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

label {
  display: block;
  margin-bottom: 5px;
}

.container-md {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 20px;

  .btnContainer {
    display: flex;
    justify-content: end;
  }
}

.btn-bd-primary {
  --bs-btn-font-weight: 600;
  --bs-btn-color: #f7f7f8;
  --bs-btn-bg: #3795bd;
  --bs-btn-border-color: #3795bd;
  --bs-btn-hover-color: #49a5cc;
  --bs-btn-hover-bg: #{shade-color#3795BD, 10%};
  --bs-btn-hover-border-color: #{shade-color#3795BD, 10%};
  --bs-btn-focus-shadow-rgb: var;
  --bs-btn-active-color: var;
  --bs-btn-active-bg: #{shade-color#3795BD, 20%};
  --bs-btn-active-border-color: #{shade-color#3795BD, 20%};
}

.w100 {
  width: 100%;
}

input {
  height: 40px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  color: #000000fc;

  cursor: pointer;
  border: 1px solid #fcfcfc21;

  margin-bottom: 5px;
}

input::placeholder {
  color: black;
}
</style>
