<template>
  <div>
    <div class="draggable-box"
         v-dragSource
         v-bind:class="{ dragging: isDragging }"
         v-bind:style="{ transform: transform, '-webkit-transform': transform }">
      <Box v-bind:title="title" />
    </div>
    <img v-dragPreview src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
  </div>
</template>

<script>
import DragSource from 'vue-react-dnd/DragSource'
import ItemTypes from './ItemTypes'
import Box from './Box'
import { getEmptyImage } from 'react-dnd-html5-backend'

export default {
  name: 'DraggableBox',
  props: ['id', 'title', 'left', 'top'],
  mixins: [DragSource],
  components: {
    Box
  },

  computed: {
    transform () {
      return 'translate3d(' + this.left + 'px, ' + this.top + 'px, 0)'
    }
  },

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
          title: this.title,
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
.draggable-box {
    position: absolute;

    &.dragging {
        opacity: 0;
        height: 0;
    }
}
</style>
