import { createRouter, createWebHistory } from 'vue-router'
import TripDetail from '../views/TripDetail.vue'
import AppTrips from '../views/AppTrips.vue'
import AppHome from '@/views/AppHome.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/trip/:index',
      name: 'trip.show',
      component: TripDetail
    },
    {
      path: '/my_trips',
      name: 'trip.myTrips',
      component: AppTrips
    }
  ]
})

export default router
