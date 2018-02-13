<template>
  <div class="dustbin" v-dropTarget v-bind:style="{'background-color': backgroundColor}">
    {{ text }}
    <br />
    <span v-if="hasDropped">
      dropped
      <span v-if="hasDroppedOnChild"> on child</span>
    </span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import ItemsTypes from './ItemTypes'
import DropTarget from 'vue-react-dnd/DropTarget'

export default {
  name: 'Dustbin',
  props: ['greedy'],
  mixins: [DropTarget],

  data () {
    return {
      hasDropped: false,
      hasDroppedOnChild: false,
      isOver: false,
      isOverCurrent: false
    }
  },

  computed: {
    backgroundColor () {
      if (this.isOverCurrent || (this.isOver && this.greedy)) {
        return 'darkgreen'
      } else {
        return 'rgba(0, 0, 0, .5)'
      }
    },

    text () {
      return this.greedy ? 'Greedy' : 'not greedy'
    }
  },

  dropTarget: {
    type () {
      return ItemsTypes.BOX
    },
    specs: {
      drop (monitor) {
        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild && !this.greedy) {
          return
        }

        this.hasDropped = true
        this.hasDroppedOnChild = hasDroppedOnChild
      }
    },
    collect (connect, monitor) {
      this.isOver = monitor.isOver()
      this.isOverCurrent = monitor.isOver({ shallow: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.dustbin {
    border: 1px solid rgba(0,0,0,0.2);
    min-height: 8rem;
    min-width: 8rem;
    color: white;
    padding: 2rem;
    padding-top: 1rem;
    margin: 1rem;
    text-algin: center;
    float: left;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .5);

    &.isOver {
        background-color: darkgreen;
    }
}
</style>
