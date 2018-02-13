const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop']

export default function createTargetFactory (spec, context) {
  class Target {
    constructor (monitor) {
      this.monitor = monitor
    }

    receiveMonitor (monitor) {
      this.monitor = monitor
    }

    canDrop () {
      if (!spec.canDrop) {
        return true
      }

      let f = spec.canDrop.bind(context)

      return f(this.monitor)
    }

    hover () {
      if (!spec.hover) {
        return
      }

      let f = spec.hover.bind(context)

      f(this.monitor)
    }

    drop () {
      if (!spec.drop) {
        return undefined
      }

      let f = spec.drop.bind(context)

      return f(this.monitor)
    }
  }

  return function createTarget (monitor) {
    return new Target(monitor)
  }
}
