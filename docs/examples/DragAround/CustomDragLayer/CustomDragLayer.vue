<template>
  <div class="layer" v-if="isDragging">
    <div v-if="!hidden" v-bind:style="{ transform: transform, '-webkit-transform': transform }">
      <BoxDragPreview v-if="isBox" v-bind:title="item.title" />
    </div>
  </div>
</template>

<script>
import DragLayer from 'vue-react-dnd/DragLayer'
import ItemTypes from './ItemTypes'
import BoxDragPreview from './BoxDragPreview'
import snapToGrid from './snapToGrid'

export default {
  name: 'CustomDragLayer',
  props: ['snapToGrid'],
  mixins: [DragLayer],

  components: {
    BoxDragPreview
  },

  computed: {
    hidden () {
      return !this.initialOffset || !this.currentOffset
    },
    transform () {
      let {x, y} = this.currentOffset

      if (this.snapToGrid) {
        x -= this.initialOffset.x
        y -= this.initialOffset.y

        let tmp = snapToGrid(x, y)

        x = tmp[0] + this.initialOffset.x
        y = tmp[1] + this.initialOffset.y
      }

      return 'translate(' + x + 'px, ' + y + 'px)'
    },
    isBox () {
      return this.itemType === ItemTypes.BOX
    }
  },

  data () {
    return {
      item: null,
      itemType: null,
      initialOffset: null,
      currentOffset: null,
      isDragging: false
    }
  },

  dragLayer: {
    collect (monitor) {
      this.item = monitor.getItem()
      this.itemType = monitor.getItemType()
      this.initialOffset = monitor.getInitialSourceClientOffset()
      this.currentOffset = monitor.getSourceClientOffset()
      this.isDragging = monitor.isDragging()
    }
  }
}
</script>

<style lang="scss" scoped>
.layer {
    position: fixed;
    pointer-events: none;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
