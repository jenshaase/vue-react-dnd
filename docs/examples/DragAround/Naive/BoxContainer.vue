<template>
  <div class="container-wrapper">
    <div class="container" v-dropTarget>
      <Box v-for="(box, key) in boxes"
           v-bind:key="key"
           v-bind:id="key"
           v-bind:left="box.left"
           v-bind:top="box.top"
           v-bind:hideSourceOnDrag="hideSourceOnDrag" >
        {{ box.title }}
      </Box>
    </div>

    <label for="checkbox">
      <input type="checkbox" id="checkbox" v-model="hideSourceOnDrag">
      Hide the source item while dragging
    </label>
  </div>
</template>

<script>
import Box from './Box'
import DropTarget from 'vue-react-dnd/DropTarget'
import ItemTypes from './ItemTypes'

export default {
  name: 'container',
  components: {
    Box
  },
  mixins: [DropTarget],
  data () {
    return {
      hideSourceOnDrag: true,
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
        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)

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
