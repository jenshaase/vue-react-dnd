<template>
  <div>
    <div style="overflow: hidden; clear: both">
      <Dustbin allowedDropEffect="any" />
      <Dustbin allowedDropEffect="copy" />
      <Dustbin allowedDropEffect="move" />
    </div>
    <div style="overflow: hidden, clear: both">
      <Box name="Glass" />
      <Box name="Banana" />
      <Box name="Paper" />
    </div>
  </div>
</template>

<script>
import Dustbin from './Dustbin'
import Box from './Box'
import DragDropContext from 'vue-react-dnd/DragDropContext'
import HTML5Backend from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    Dustbin,
    Box
  },
  mixins: [DragDropContext(HTML5Backend)]
}
</script>

<style lang="scss">

</style>
