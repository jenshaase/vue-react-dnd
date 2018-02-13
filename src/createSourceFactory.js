const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag']
const REQUIRED_SPEC_METHODS = ['beginDrag']

export default function createSourceFactory (spec, context) {
  class Source {
    constructor (monitor) {
      this.monitor = monitor
    }

    canDrag () {
      if (!spec.canDrag) {
        return true
      }

      let f = spec.canDrag.bind(context)

      return f(this.monitor)
    }

    isDragging (globalMonitor, sourceId) {
      if (!spec.isDragging) {
        return sourceId === globalMonitor.getSourceId()
      }

      let f = spec.isDragging.bind(context)

      return f(this.monitor)
    }

    beginDrag () {
      let f = spec.beginDrag.bind(context)

      return f(this.monitor, this.component)
    }

    endDrag () {
      if (!spec.endDrag) {
        return
      }

      let f = spec.endDrag.bind(context)

      f(this.monitor)
    }
  }

  return function createSource (monitor) {
    return new Source(monitor)
  }
}
