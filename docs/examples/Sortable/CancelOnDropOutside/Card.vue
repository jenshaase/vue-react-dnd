<template>
  <div class="card" v-dragSource v-dropTarget v-bind:class="{dragging: isDragging}">{{ text }}</div>
</template>

<script>
import DragSource from 'vue-react-dnd/DragSource'
import DropTarget from 'vue-react-dnd/DropTarget'
import ItemTypes from './ItemTypes'

export default {
  name: 'Card',
  props: ['id', 'findCard', 'text'],
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
          originalIndex: this.findCard(this.id).index
        }
      },

      endDrag (monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (!didDrop) {
          this.$emit('moveCard', droppedId, originalIndex)
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
      canDrop () {
        return false
      },
      hover (monitor) {
        const { id: draggedId } = monitor.getItem()
        const overId = this.id

        if (draggedId !== overId) {
          const { index: overIndex } = this.findCard(overId)
          this.$emit('moveCard', draggedId, overIndex)
        }
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
