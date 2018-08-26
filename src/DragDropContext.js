import { DragDropManager } from 'dnd-core'

export default function DragDropContext (backendOrModule, context = {}) {
  let backend = backendOrModule
  if (typeof backend === 'object' && typeof backend.default === 'function') {
    backend = backend.default
  }

  return {
    provide: {
      dragDropManager: new DragDropManager(backend, context)
    }
  }
}
