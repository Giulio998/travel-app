<script>
import texture1 from '@/assets/texture1.jpg'
import texture3 from '@/assets/texture3.jpg'
import texture4 from '@/assets/texture4.jpg'
import texture5 from '@/assets/texture5.jpg'
import texture6 from '@/assets/texture6.jpg'
import texture7 from '@/assets/texture7.jpg'
import texture8 from '@/assets/texture8.jpg'
import texture9 from '@/assets/texture9.jpg'
import texture10 from '@/assets/texture10.jpg'
import texture11 from '@/assets/texture11.jpg'

import router from '../router/index'

export default {
  data() {
    const imgArray = [
      texture1,
      texture3,
      texture4,
      texture5,
      texture6,
      texture7,
      texture8,
      texture9,
      texture10,
      texture11
    ]
    return {
      imgArray
    }
  },
  emits: ['deleteTrip'],
  props: { trip: Object, index: Number },
  methods: {
    redirectToDetail(index) {
      router.push(`/trip/${index}`)
    },
    convertData(formatoISO) {
      let [anno, mese, giorno] = formatoISO.split('-')
      return `${giorno}/${mese}/${anno}`
    }
  }
}
</script>

<template>
  <div class="myCard">
    <router-link :to="{ name: 'trip.show', params: { index: index } }" class="router-link">
      <div class="coverImage">
        <img :src="imgArray[Math.floor(Math.random() * 10)]" alt="" />
      </div>
      <div class="tripDetails">
        <h2 class="detailCap">{{ trip.name }}</h2>
        <small class="detailCap">Data Partenza: {{ convertData(trip.start_date) }}</small>
        <small class="detailCap">Data Ritorno: {{ convertData(trip.end_date) }}</small>
      </div>
    </router-link>
    <div class="btnContainer">


      <button type="button" class="btn border-danger deleteBtn" @click="this.$emit('deleteTrip', index)">
        <p>Elimina</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

.myCard {
  width: 275px;
  position: relative;
  height: 100%;
  z-index: 2;
  color: white !important;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff44;
  backdrop-filter: blur(8px);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;

  .restaurantDetails {
    padding: 0px 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }

  .coverImage {
    width: 100%;
    height: 40px;
    background-color: lightblue;
    margin-bottom: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      object-fit: cover;
      opacity: 80%;
    }
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
}

h3.detailCap {
  font-size: 25px;
  color: white;
}

.detailCap {
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  color: white;
}

.router-link {
  text-decoration: none;
}

.rightColumn {
  padding: 0;
  overflow: auto;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  align-content: flex-start;
}

.detailCap {
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.tripDetails {
  padding: 5px 10px;
}

.btnContainer {
  padding: 10px;
  display: flex;
  justify-content: end;
}
</style>
