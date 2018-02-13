<template>
  <DragDropContextProvider v-bind:backend="html5Backend">
    <CustomDragLayerContainer />
  </DragDropContextProvider>
</template>

<script>
import CustomDragLayerContainer from './CustomDragLayerContainer'
import DragDropContextProvider from 'vue-react-dnd/DragDropContextProvider'
import HTML5Backend from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    CustomDragLayerContainer,
    DragDropContextProvider
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
