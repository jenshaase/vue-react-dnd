<template>
  <div v-dropTarget style="width: 400px">
    <Card v-for="(card, i) in cards"
          v-bind:index="i"
          v-bind:key="card.id"
          v-bind:id="card.id"
          v-bind:text="card.text"
          v-bind:findCard="findCard"
          v-on:moveCard="onMoveCard" />
  </div>
</template>

<script>
import Card from './Card'
import DropTarget from 'vue-react-dnd/DropTarget'
import ItemTypes from './ItemTypes'

export default {
  name: 'container',
  components: {
    Card
  },
  mixins: [DropTarget],

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
    onMoveCard (id, atIndex) {
      const { card, index } = this.findCard(id)
      this.cards[index] = this.cards.splice(atIndex, 1, card)[0]
    },

    findCard (id) {
      const card = this.cards.filter(c => c.id === id)[0]

      return {
        card: card,
        index: this.cards.indexOf(card)
      }
    }
  },

  dropTarget: {
    type () {
      return ItemTypes.CARD
    },
    specs: {
      drop () {}
    }
  }
}
</script>

<style lang="scss">

</style>
