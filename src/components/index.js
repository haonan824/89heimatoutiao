import homelist from './home/homelist.vue'
import hometop from './home/hometop.vue'
import breadCrumbs from './comment/bread-crumbs.vue'
import imgframe from './publish/img-frame.vue' // 引入上传图片框
import imgmatter from './publish/img-matter.vue' // 引入内容
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
export default {
  install (Vue) {
    Vue.component('homelist', homelist)
    Vue.component('hometop', hometop)
    Vue.component('bread-crumbs', breadCrumbs)
    Vue.component('quill-editor', quillEditor)
    Vue.component('img-frame', imgframe)
    Vue.component('img-matter', imgmatter)
  }
}
