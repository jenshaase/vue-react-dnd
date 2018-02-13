import registerSource from './registerSource'
import createSourceFactory from './createSourceFactory'
import createSourceMonitor from './createSourceMonitor'
import createSourceConnector from './createSourceConnector'
import arrayEqual from './arrayEqual'
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables'

export default {
  inject: ['dragDropManager'],

  data () {
    let sourceMonitor = createSourceMonitor(this.dragDropManager)
    const createSource = createSourceFactory(this.$options.dragSource.specs, this)

    return {
      dragSourceHandler: createSource(sourceMonitor),
      dragSourceHandlerMonitor: sourceMonitor,
      dragSourceHandlerConnector: createSourceConnector(this.dragDropManager.getBackend()),
      dragSourceDisposable: new SerialDisposable(),
      isDragSourceCurrentlyMounted: false,
      currentDragSourceType: null,
      dragSourceHandlerId: null
    }
  },

  mounted () {
    this.isDragSourceCurrentlyMounted = true
    this.dragSourceDisposable = new SerialDisposable()
    this.currentDragSourceType = null

    this.receiveDragSourceProps()
    this.handleDragSourceChange()
  },

  beforeUpdate () {
    this.receiveDragSourceProps()
    this.handleDragSourceChange()
  },

  beforeDestroy () {
    this.disposeDragSource()
    this.isDragSourceCurrentlyMounted = false
  },

  directives: {
    dragSource: {
      inserted: function (el, binding, vnode) {
        vnode.context.dragSourceHandlerConnector.hooks.dragSource(el)
      },
      componentUpdated: function (el, binding, vnode) {
        vnode.context.dragSourceHandlerConnector.hooks.dragSource(el)
      }
    },
    dragPreview: {
      inserted: function (el, binding, vnode) {
        vnode.context.dragSourceHandlerConnector.hooks.dragPreview(el)
      },
      componentUpdated: function (el, binding, vnode) {
        vnode.context.dragSourceHandlerConnector.hooks.dragPreview(el)
      }
    }
  },

  methods: {
    disposeDragSource () {
      this.dragSourceDisposable.dispose()
      this.dragSourceHandlerConnector.receiveHandlerId(null)
    },

    handleDragSourceChange () {
      if (this.$options && this.$options.dragSource && this.$options.dragSource.collect) {
        let f = this.$options.dragSource.collect.bind(this)
        f(this.dragSourceHandlerConnector.hooks, this.dragSourceHandlerMonitor)
      }
    },

    receiveDragSourceProps () {
      let typeF = this.$options.dragSource.type.bind(this)
      this.receiveDragSourceType(typeF())
    },

    receiveDragSourceType (type) {
      if (arrayEqual(type, this.currentDragSourceType)) {
        return
      }

      this.currentDragSourceType = type

      const { handlerId, unregister } = registerSource(
        type,
        this.dragSourceHandler,
        this.dragDropManager
      )

      this.dragSourceHandlerId = handlerId
      this.dragSourceHandlerMonitor.receiveHandlerId(handlerId)
      this.dragSourceHandlerConnector.receiveHandlerId(handlerId)

      const globalMonitor = this.dragDropManager.getMonitor()
      const unsubscribe = globalMonitor.subscribeToStateChange(
        this.handleDragSourceChange,
        { handlerIds: [handlerId] }
      )

      this.dragSourceDisposable.setDisposable(
        new CompositeDisposable(
          new Disposable(unsubscribe),
          new Disposable(unregister)
        )
      )
    }
  }
}
