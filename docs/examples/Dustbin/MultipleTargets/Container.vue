<template>
  <div>
    <div style="overflow: hidden; clear: both">
      <Dustbin v-for="(dustbin, index) in dustbins"
               v-bind:accepts="dustbin.accepts"
               v-bind:lastDroppedItem="dustbin.lastDroppedItem"
               v-on="{ drop: handleDrop(index) }"
               v-bind:key="index" />
    </div>
    <div style="overflow: hidden, clear: both">
      <Box v-for="(box, index) in boxes"
           v-bind:name="box.name"
           v-bind:type="box.type"
           v-bind:isDropped="isDropped(box.name)"
           v-bind:key="index" />
    </div>
  </div>
</template>

<script>
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'
import { DragDropContext } from 'vue-react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    Dustbin,
    Box
  },
  mixins: [DragDropContext(HTML5Backend)],
  data () {
    return {
      dustbins: [
        { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
        { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
        {
          accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
          lastDroppedItem: null
        },
        { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null }
      ],
      boxes: [
        { name: 'Bottle', type: ItemTypes.GLASS },
        { name: 'Banana', type: ItemTypes.FOOD },
        { name: 'Magazine', type: ItemTypes.PAPER }
      ],
      droppedBoxNames: []
    }
  },
  methods: {
    isDropped (boxName) {
      return this.droppedBoxNames.indexOf(boxName) > -1
    },
    handleDrop (index) {
      return function (item) {
        const { name } = item

        this.dustbins[index].lastDroppedItem = item
        if (name) {
          this.droppedBoxNames.push(name)
        }
      }.bind(this)
    }
  }
}
</script>

<style lang="scss">

</style>
