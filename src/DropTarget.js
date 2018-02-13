import registerTarget from './registerTarget'
import createTargetFactory from './createTargetFactory'
import createTargetMonitor from './createTargetMonitor'
import createTargetConnector from './createTargetConnector'
import arrayEqual from './arrayEqual'
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables'

export default {
  inject: ['dragDropManager'],

  data () {
    let targetMonitor = createTargetMonitor(this.dragDropManager)
    let createTarget = createTargetFactory(this.$options.dropTarget.specs, this)

    return {
      dropTargetHandler: createTarget(targetMonitor),
      dropTargetHandlerMonitor: targetMonitor,
      dropTargetHandlerConnector: createTargetConnector(this.dragDropManager.getBackend()),
      dropTargetDisposable: new SerialDisposable(),
      isDropTargetCurrentlyMounted: false,
      currentDropTargetType: null,
      dropTargetHandlerId: null
    }
  },

  mounted () {
    this.isDropTargetCurrentlyMounted = true
    this.dropTargetDisposable = new SerialDisposable()
    this.currentDropTargetType = null

    this.receiveDropTargetProps(this.$props)
    this.handleDropTargetChange()
  },

  beforeUpdate () {
    this.receiveDropTargetProps(this.$props)
    this.handleDropTargetChange()
  },

  beforeDestroy () {
    this.disposeDropTarget()
    this.isDropTargetCurrentlyMounted = false
  },

  directives: {
    dropTarget: {
      inserted: function (el, binding, vnode) {
        vnode.context.dropTargetHandlerConnector.hooks.dropTarget(el)
      },
      componentUpdated: function (el, binding, vnode) {
        vnode.context.dropTargetHandlerConnector.hooks.dropTarget(el)
      }
    }
  },

  methods: {
    disposeDropTarget () {
      this.dropTargetDisposable.dispose()
      this.dropTargetHandlerConnector.receiveHandlerId(null)
    },

    handleDropTargetChange () {
      if (this.$options && this.$options.dropTarget && this.$options.dropTarget.collect) {
        let f = this.$options.dropTarget.collect.bind(this)
        f(this.dropTargetHandlerConnector.hooks, this.dropTargetHandlerMonitor)
      }
    },

    receiveDropTargetProps () {
      let typeF = this.$options.dropTarget.type.bind(this)
      this.receiveDropTargetType(typeF())
    },

    receiveDropTargetType (type) {
      if (arrayEqual(type, this.currentDropTargetType)) {
        return
      }

      this.currentDropTargetType = type

      const { handlerId, unregister } = registerTarget(
        type,
        this.dropTargetHandler,
        this.dragDropManager
      )

      this.dropTargetHandlerId = handlerId
      this.dropTargetHandlerMonitor.receiveHandlerId(handlerId)
      this.dropTargetHandlerConnector.receiveHandlerId(handlerId)

      const globalMonitor = this.dragDropManager.getMonitor()
      const unsubscribe = globalMonitor.subscribeToStateChange(
        this.handleDropTargetChange,
        { handlerIds: [handlerId] }
      )

      this.dropTargetDisposable.setDisposable(
        new CompositeDisposable(
          new Disposable(unsubscribe),
          new Disposable(unregister)
        )
      )
    }
  }
}
