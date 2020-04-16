import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Showcase from './pages/Showcase.vue'

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'showcase',
            component: Showcase
        }
    ]
})