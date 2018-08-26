<template>
  <DragDropContextProvider v-bind:backend="html5Backend">
    <BoxContainer />
  </DragDropContextProvider>
</template>

<script>
import BoxContainer from './BoxContainer'
import { DragDropContextProvider } from 'vue-react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    BoxContainer,
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
