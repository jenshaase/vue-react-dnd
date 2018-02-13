import invariant from 'invariant'

let isCallingCanDrag = false
let isCallingIsDragging = false

class SourceMonitor {
  constructor (manager) {
    this.internalMonitor = manager.getMonitor()
  }

  receiveHandlerId (sourceId) {
    this.sourceId = sourceId
  }

  canDrag () {
    try {
      isCallingCanDrag = true
      return this.internalMonitor.canDragSource(this.sourceId)
    } finally {
      isCallingCanDrag = false
    }
  }

  isDragging () {
    try {
      isCallingIsDragging = true
      return this.internalMonitor.isDraggingSource(this.sourceId)
    } finally {
      isCallingIsDragging = false
    }
  }

  getItemType () {
    return this.internalMonitor.getItemType()
  }

  getItem () {
    return this.internalMonitor.getItem()
  }

  getDropResult () {
    return this.internalMonitor.getDropResult()
  }

  didDrop () {
    return this.internalMonitor.didDrop()
  }

  getInitialClientOffset () {
    return this.internalMonitor.getInitialClientOffset()
  }

  getInitialSourceClientOffset () {
    return this.internalMonitor.getInitialSourceClientOffset()
  }

  getSourceClientOffset () {
    return this.internalMonitor.getSourceClientOffset()
  }

  getClientOffset () {
    return this.internalMonitor.getClientOffset()
  }

  getDifferenceFromInitialOffset () {
    return this.internalMonitor.getDifferenceFromInitialOffset()
  }
}

export default function createSourceMonitor (manager) {
  return new SourceMonitor(manager)
}
