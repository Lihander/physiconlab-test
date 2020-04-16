import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex, Axios)

export default new Vuex.Store({
    state: {
        courses: []
    },
    mutations: {
        setCourses(state, courses) {
            state.courses = courses
        }
    },
    actions: {
        setCourses: function ({commit} , payload) {
            Axios
                .post('http://krapipl.imumk.ru:8082/api/mobilev1/update', payload)
                .then(res => {
                    commit('setCourses', res.data.items)
                })
        }
    },
    getters: {
        getCourses(state) {
            return state.courses
        }
    }
})