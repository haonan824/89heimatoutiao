import homelist from './home/homelist.vue'
import hometop from './home/hometop.vue'
import breadCrumbs from './comment/bread-crumbs.vue'
export default {
  install (Vue) {
    Vue.component('homelist', homelist)
    Vue.component('hometop', hometop)
    Vue.component('bread-crumbs', breadCrumbs)
  }
}
