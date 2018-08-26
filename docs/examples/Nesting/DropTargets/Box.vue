<template>
  <div class="box" v-dragSource>Drag me</div>
</template>

<script>
import { DragSource } from 'vue-react-dnd'
import ItemTypes from './ItemTypes'

export default {
  name: 'Box',
  mixins: [DragSource],

  dragSource: {
    type () {
      return ItemTypes.BOX
    },
    specs: {
      beginDrag () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
    display: inline-block;
    border: 1px dashed gray;
    background-color: white;
    padding: 0.5rem 1rem;
    cursor: move;
}
</style>
