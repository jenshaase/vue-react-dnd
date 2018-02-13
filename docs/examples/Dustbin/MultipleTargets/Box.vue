<template>
  <div class="box" v-dragSource v-bind:class="{dragging: isDragging, isDropped: isDropped}">{{ name }}</div>
</template>

<script>
import DragSource from 'vue-react-dnd/DragSource'
import ItemTypes from './ItemTypes'

export default {
  name: 'Box',
  props: ['name', 'type', 'isDropped'],
  mixins: [DragSource],

  data () {
    return {
      isDragging: false
    }
  },

  dragSource: {
    type () {
      return this.type
    },
    specs: {
      beginDrag () {
        return {
          name: this.name
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
    border: 1px solid gray;
    background-color: white;
    padding: 0.5rem 1rem;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    cursor: move;
    float: left;

    &.dragging {
        opacity: 0.4;
    }

    &.isDropped {
        text-decoration: line-through;
    }
}
</style>
