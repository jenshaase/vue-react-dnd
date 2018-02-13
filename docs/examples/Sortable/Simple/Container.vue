<template>
  <div style="width: 400px">
    <Card v-for="(card, i) in cards"
          v-bind:index="i"
          v-bind:key="card.id"
          v-bind:id="card.id"
          v-bind:text="card.text"
          v-on:moveCard="onMoveCard" />
  </div>
</template>

<script>
import Card from './Card'
import DragDropContext from 'vue-react-dnd/DragDropContext'
import HTML5Backend from 'react-dnd-html5-backend'

export default {
  name: 'container',
  components: {
    Card
  },
  mixins: [DragDropContext(HTML5Backend)],

  data () {
    return {
      cards: [
        { id: 1, text: 'Write a cool JS library' },
        { id: 2, text: 'Make it generic enough' },
        { id: 3, text: 'Write README' },
        { id: 4, text: 'Create some examples' },
        { id: 5, text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)' },
        { id: 6, text: '???' },
        { id: 7, text: 'PROFIT' }
      ]
    }
  },

  methods: {
    onMoveCard (dragIndex, hoverIndex) {
      const dragCard = this.cards[dragIndex]
      this.cards[dragIndex] = this.cards.splice(hoverIndex, 1, dragCard)[0]
    }
  }
}
</script>

<style lang="scss">

</style>
