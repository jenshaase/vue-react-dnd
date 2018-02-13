<template>
  <div class="dustbin" v-dropTarget v-bind:class="{active: isActive, canDrop: !isActive && canDrop }">
    Works with {{ allowedDropEffect }} drop effect!
    <br />
    <br />
    {{ text }}
  </div>
</template>

<script>

import ItemsTypes from './../SingleTarget/ItemTypes'
import DropTarget from 'vue-react-dnd/DropTarget'

export default {
  name: 'Dustbin',
  props: ['allowedDropEffect'],
  mixins: [DropTarget],

  data () {
    return {
      isOver: false,
      canDrop: false
    }
  },

  computed: {
    isActive () {
      return this.canDrop && this.isOver
    },

    text () {
      return this.isActive ? 'Release to drop' : 'Drag a box here'
    }
  },

  dropTarget: {
    type () {
      return ItemsTypes.BOX
    },
    specs: {
      drop () {
        return {
          name: this.allowedDropEffect + ' Dustbin',
          allowedDropEffect: this.allowedDropEffect
        }
      }
    },
    collect (connect, monitor) {
      this.isOver = monitor.isOver()
      this.canDrop = monitor.canDrop()
    }
  }
}
</script>

<style lang="scss" scoped>
.dustbin {
    height: 12rem;
    width: 12rem;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    color: white;
    padding: 1rem;
    text-align: center;
    font-size: 1rem;
    line-height: normal;
    float: left;
    background-color: #222;

    &.active {
        background-color: darkgreen;
    }

    &.canDrop {
        background-color: darkkhaki;
    }
}
</style>
