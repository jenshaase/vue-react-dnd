// Import vue component
import DragDropContextProvider from './DragDropContextProvider.vue'
import DropTarget from './DropTarget.js'
import DragSource from './DragSource.js'
import DragDropContext from './DragDropContext.js'
import DragLayer from './DragLayer.js'

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('DragDropContextProvider', DragDropContextProvider)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  DragDropContextProvider,
  DropTarget,
  DragSource,
  DragDropContext,
  DragLayer
}

export {
  DragDropContextProvider,
  DropTarget,
  DragSource,
  DragDropContext,
  DragLayer
}
