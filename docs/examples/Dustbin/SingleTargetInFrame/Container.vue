<template>
  <Frame style="width: 100%; height: 100%">
    <DragDropContextProvider v-bind:backend="html5Backend">
      <div>
        <div style="overflow: hidden; clear: both">
          <Dustbin />
        </div>
        <div style="overflow: hidden, clear: both">
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </div>
      </div>
    </DragDropContextProvider>
  </Frame>
</template>

<script>
import Dustbin from './../SingleTarget/Dustbin'
import Box from './../SingleTarget/Box'
import DragDropContextProvider from 'vue-react-dnd/DragDropContextProvider'
import HTML5Backend from 'react-dnd-html5-backend'
import Frame from 'docs/components/Frame'

export default {
  name: 'container',
  components: {
    Frame,
    DragDropContextProvider,
    Dustbin,
    Box
  },
  data () {
    return {
      html5Backend: HTML5Backend
    }
  }
}
</script>

<style lang="scss">

</style>
