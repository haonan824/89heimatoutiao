import homelist from './home/homelist.vue'
import hometop from './home/hometop.vue'

export default {
  install (Vue) {
    Vue.component('homelist', homelist)
    Vue.component('hometop', hometop)
  }
}
