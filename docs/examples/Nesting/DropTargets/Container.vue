<template>
  <div>
    <div style="overflow: hidden; clear: both; margin: -1rem;">
      <Dustbin greedy="true">
        <Dustbin greedy="true">
          <Dustbin greedy="true" />
        </Dustbin>
      </Dustbin>

      <Dustbin>
        <Dustbin>
          <Dustbin />
        </Dustbin>
      </Dustbin>
    </div>
    <div style="overflow: hidden, clear: both; margin-top: 1.5rem;">
      <Box />
    </div>
  </div>
</template>

<script>
import Dustbin from './Dustbin'
import Box from './Box'
import { DragDropContext } from 'vue-react-dnd'
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
