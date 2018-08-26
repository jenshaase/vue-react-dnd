<template>
  <div v-if="!(isDragging && hideSourceOnDrag)"
       class="box"
       v-dragSource
       v-bind:style="{left: left + 'px', top: top + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
import { DragSource } from 'vue-react-dnd'
import ItemTypes from './ItemTypes'

export default {
  name: 'Box',
  props: ['id', 'left', 'top', 'hideSourceOnDrag'],
  mixins: [DragSource],

  data () {
    return {
      isDragging: false
    }
  },

  dragSource: {
    type () {
      return ItemTypes.BOX
    },
    specs: {
      beginDrag () {
        return {
          id: this.id,
          left: this.left,
          top: this.top
        }
      }
    },
    collect (connect, monitor) {
      this.isDragging = monitor.isDragging()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
    position: absolute;
    border: 1px solid gray;
    background-color: white;
    padding: 0.5rem 1rem;
    cursor: move;
}
</style>
