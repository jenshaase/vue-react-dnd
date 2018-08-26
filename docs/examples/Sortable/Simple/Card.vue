<template>
  <div class="card" v-dragSource v-dropTarget v-bind:class="{dragging: isDragging}">{{ text }}</div>
</template>

<script>
import { DragSource, DropTarget } from 'vue-react-dnd'
import ItemTypes from './ItemTypes'

export default {
  name: 'Card',
  props: ['id', 'index', 'text'],
  mixins: [DragSource, DropTarget],

  data () {
    return {
      isDragging: false
    }
  },

  dragSource: {
    type () {
      return ItemTypes.CARD
    },
    specs: {
      beginDrag () {
        return {
          id: this.id,
          index: this.index
        }
      }
    },
    collect (connect, monitor) {
      this.isDragging = monitor.isDragging()
    }
  },

  dropTarget: {
    type () {
      return ItemTypes.CARD
    },
    specs: {
      hover (monitor) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = this.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = this.$el.getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        // Time to actually perform the action
        this.$emit('moveCard', dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
    border: 1px dashed gray;
    padding: 0.5rem 1rem;
    margin-bottom: .5rem;
    background-color: white;
    cursor: move;

    &.dragging {
        opacity: 0;
    }
}
</style>
