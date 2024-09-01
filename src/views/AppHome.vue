<script>
import londra from '../assets/londra.jpg'
import ny from '../assets/ny.jpg'
import sanFrancisco from '../assets/sanFrancisco.jpg'
import TripForm from '../components/TripForm.vue'

export default {
  data() {
    let counter = 0
    let imgArray = [sanFrancisco, londra, ny]
    return {
      londra,
      ny,
      sanFrancisco,
      counter,
      imgArray
    }
  },
  components: {
    TripForm
  },
  methods: {
    slideshow() {
      if (this.counter < this.imgArray.length - 1) {
        this.counter++
      } else {
        this.counter = 0
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.slideshow()
    }, 10000)
  }
}
</script>

<template>
  <div class="slidesContainer">
    <div class="overlay"></div>
    <div class="textContainer">
      <h1>Viaggi perfetti, pianificati con passione.</h1>
    </div>
    <div class="actionContainer">
      <div class="buttonContainer">
        <TripForm />
      </div>
    </div>

    <img class="w-100 h-100" :src="imgArray[this.counter]" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.slidesContainer {
  height: calc(100vh - 80px);
  width: 100vw;
  position: relative;

  .textContainer {
    position: absolute;
    color: white;
    z-index: 999;
    width: 50vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 50px;

    h1 {
      font-size: 80px;
    }
  }

  .actionContainer {
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    z-index: 999;
    width: 50vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;

    .buttonContainer {
      width: 380px;
      height: 450px;
      background-color: #ffffff44;
      backdrop-filter: blur(8px);
      border-radius: 20px;

    }

    h1 {
      font-size: 100px;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgb(0 0 0 / 40%);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 997;
  }
}
</style>
