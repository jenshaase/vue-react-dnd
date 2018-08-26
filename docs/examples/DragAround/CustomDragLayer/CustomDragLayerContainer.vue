<template>
  <div class="container-wrapper">
    <div class="container" v-dropTarget>
      <DraggableBox v-for="(box, key) in boxes"
           v-bind:key="key"
           v-bind:id="key"
           v-bind:title="box.title"
           v-bind:left="box.left"
           v-bind:top="box.top">
      </DraggableBox>
    </div>

    <CustomDragLayer v-bind:snapToGrid="snapToGrid" />

    <label for="checkbox">
      <input type="checkbox" id="checkbox" v-model="snapToGrid">
      Snap to Grid
    </label>
  </div>
</template>

<script>
import DraggableBox from './DraggableBox'
import { DropTarget } from 'vue-react-dnd'
import ItemTypes from './ItemTypes'
import CustomDragLayer from './CustomDragLayer'
import snapToGrid from './snapToGrid'

export default {
  name: 'container',
  components: {
    DraggableBox,
    CustomDragLayer
  },
  mixins: [DropTarget],
  data () {
    return {
      snapToGrid: false,
      boxes: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' }
      }
    }
  },
  methods: {
    moveBox (id, left, top) {
      this.boxes[id].top = top
      this.boxes[id].left = left
    }
  },
  dropTarget: {
    type () {
      return ItemTypes.BOX
    },
    specs: {
      drop (monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const item = monitor.getItem()

        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)

        if (this.snapToGrid) {
          const tmp = snapToGrid(left, top)
          left = tmp[0]
          top = tmp[1]
        }

        this.moveBox(item.id, left, top)
      }
    }
  }
}
</script>

<style lang="scss">
.container {
    width: 300px;
    height: 300px;
    border: 1px solid black;
    position: relative;
}
</style>
