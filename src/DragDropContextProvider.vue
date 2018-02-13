<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { DragDropManager } from 'dnd-core'

export default {
  name: 'app',
  inject: {
    window: { default: window }
  },
  props: ['backend', 'backendWindow'],
  provide () {
    return {
      dragDropManager: new DragDropManager(this.getBackend(), {
        window: this.getWindow()
      })
    }
  },
  methods: {
    getBackend () {
      let backend = this.backend
      if (typeof backend === 'object' && typeof backend.default === 'function') {
        backend = backend.default
      }

      return backend
    },
    getWindow () {
      if (this.backendWindow) {
        return this.backendWindow
      } else if (this.window) {
        return this.window
      } else {
        return window
      }
    }
  }
}
</script>

<style lang="scss">

</style>
