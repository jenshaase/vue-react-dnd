export default {
  inject: ['dragDropManager'],

  data () {
    return {
      dragLayerUnsubscribeFromOffsetChange: null,
      dragLayerUnsubscribeFromStateChange: null,
      dragLayerIsCurrentlyMounted: false
    }
  },

  mounted () {
    this.dragLayerIsCurrentlyMounted = true

    let monitor = this.dragDropManager.getMonitor()
    this.dragLayerUnsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(
      this.dragLayerHandleChange
    )

    this.dragLayerUnsubscribeFromStateChange = monitor.subscribeToStateChange(
      this.dragLayerHandleChange
    )

    this.dragLayerHandleChange()
  },

  beforeDestroy () {
    this.dragLayerIsCurrentlyMounted = false
    this.dragLayerUnsubscribeFromOffsetChange()
    this.dragLayerUnsubscribeFromStateChange()
  },

  methods: {
    dragLayerHandleChange () {
      if (!this.dragLayerIsCurrentlyMounted) {
        return
      }

      if (this.$options && this.$options.dragLayer && this.$options.dragLayer.collect) {
        let f = this.$options.dragLayer.collect.bind(this)
        f(this.dragDropManager.getMonitor())
      }
    }
  }
}
