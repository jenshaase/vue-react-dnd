<template>
  <CardList />
</template>

<script>
import CardList from './CardList'
import { DragDropContext } from 'vue-react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    CardList
  },
  mixins: [DragDropContext(HTML5Backend)]
}
</script>

<style lang="scss">

</style>
