# vue-react-dnd

Vue Drag and Drop Library based on [react-dnd](https://github.com/react-dnd/react-dnd).

vue-react-dnd has no dependency to React itself, since it only uses
`dnd-core` as dependency.

## Install

```
npm install --save vue-react-dnd
npm install --save react-dnd-html5-backend
```

## Usage

Make sure you are familiar with react-dnd concepts. An overview of all
the concepts can be found here:
<http://react-dnd.github.io/react-dnd/docs-overview.html>

### DragSource

To make a vue component draggable you need to add the `DragSource`
mixin, define the `dragSource` configuration and add the `v-dragSource`
directive to the HTML.

```html
<!-- 
  Use the v-dragSource directive on the element you want to drag.
  The directive can anywhere in the HTML and must not be the root element
-->
<div v-dragSource v-bind:class="{dragging: isDragging}">Drag me</div>
```

```javascript
// 1. Import DragSource Mixin
import { DragSource } from 'vue-react-dnd'

new Vue({

  // ...
  
  // 2. Add DragSource Mixin to Component
  mixins: [DragSource],
  
  data () {
    return {
      isDragging: false
    }
  },

  // 3. Definine type function, specs object and collect function
  dragSource: {
    // Required. Returns either a string, an ES6 symbol.
    // Only the drop targets registered for the same type will react to the
    // items produced by this drag source. 
    // Read the react-dnd documentation to learn more about the items and types.
    type () {
      return ItemTypes.BOX
    },
    
    // Required. A plain JavaScript object with a few allowed methods on it.
    // It describes how the drag source reacts to the drag and drop events. 
    // Read the react-dnd documentation to learn more about the drag source specification.
    specs: {
      beginDrag () {
        return {
          name: 'Drag me'
        }
      },

      endDrag (monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
          alert('You dropped me!')
        }
      }
    },
    // Optional. The collecting function receives two parameters: connect and monitor.
    // It can update a components internal state.
    // Read the react-dnd documentation an introduction to the monitors, the connectors.
    collect (connect, monitor) {
      this.isDragging = monitor.isDragging()
    }
  }
  
  // ...
  
})

```

### DropTarget

To make a vue component a drop traget you need to add the `DropTarget`
mixin, define the `dropTarget` configuration and add a `v-dropTarget`
directive to the HTML.

```html
<!-- 
  Use the v-dropTarget directive on the element you want to have a drop traget.
  The directive can be anywhere in the HTML and must not be the root element
-->
<div v-dropTarget v-bind:class="{active: isActive, canDrop: !isActive && canDrop }">
  Drag a box here
</div>
```

```javascript
// 1. Import DropTarget Mixin
import { DropTarget } from 'vue-react-dnd'

new Vue({
  
  // ...
  
  // 2. Add DropTarget Mixin to Component
  mixins: [DropTarget],
  
  data () {
    return {
      isOver: false,
      canDrop: false
    }
  },
  
  computed: {
    isActive () {
      return this.canDrop && this.isOver
    }
  },
  
  // 2. Definine type function, specs object and collect function
  dropTarget: {
    // Required. Returns a string, an ES6 symbol, an array of either.
    // This drop target will only react to the items produced by the drag sources
    // of the specified type or types. 
    // Read the react-dnd documentation to learn more about the items and types.
    type () {
      return ItemsTypes.BOX
    },
    
    // Required. A plain JavaScript object with a few allowed methods on it.
    // It describes how the drop target reacts to the drag and drop events.
    // See the react-dnd documentaion where the drop target specification is 
    // described in detail.
    specs: {
      drop () {
        return { name: 'Dustbin' }
      }
    },
    // Optional. The collecting function receives two parameters: connect and monitor.
    // It can update a components internal state.
    // Read the react-dnd documentation an introduction to the monitors, the connectors.
    collect (connect, monitor) {
      this.isOver = monitor.isOver()
      this.canDrop = monitor.canDrop()
    }
  }
  
  // ...
  
})

```

### DragLayer

see: `docs/examples/DragAround/CustomDragLayer/CustomDragLayer.vue`

### DragDropContext

Use the `DragDropContext` mixin to add a Drag and Drop Backend to your
application.

```html
<MyApp />
```

```javascript
import { DragDropContext } from 'vue-react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

new Vue({

  // ...
  
  mixins: [DragDropContext(HTML5Backend)]
  
  // ...
  
})

```

### DragDropContextProvider

Use the `DragDropContextProvider` component to add a Drag and Drop
Backend to your application.

```html
<DragDropContextProvider v-bind:backend="html5Backend">
    <MyApp />
</DragDropContextProvider>
```

```javascript
import { DragDropContextProvider } from 'vue-react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

new Vue({
  
  // ...
  
  components: {
    DragDropContextProvider
  },
  
  data () {
    return {
      html5Backend: HTML5Backend
    }
  }
  
  // ...
  
})

```

## Differences to react-dnd

### Specs function without `props` parameter

The specs functions in `vue-react-dnd` do not have the `props`
parameter, since all values of the component can be directly accessed
using `this`.

### Collect Function

In `react-dnd` the collect function always has to return a plain
JavaScript Object that updates the internal state. In `vue-react-dnd`
the internal state can be set directly using `this`. Therefore the
collect function is optional in `vue-react-dnd`.

## Examples

Examples can be found in the `docs/examples` directory. Most of the
examples are reimplementations of the examples provided by
react-dnd. A live version of the examples can be found here:

<https://jenshaase.github.io/vue-react-dnd>

## Development

Run examples: `npm run dev`

Lint code: `npm run lint`

Publish documentation to gh-pages: `npm run publish:doc`
