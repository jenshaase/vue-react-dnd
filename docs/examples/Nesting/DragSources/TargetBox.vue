<template>
  <div class="target-box"
       v-dropTarget
       v-bind:style="{'background-color': backgroundColor, 'opacity': opacity}">
    <p>Drop here.</p>
    <p v-if="!canDrop && lastDroppedColor">Last dropped color: {{ lastDroppedColor }}</p>
  </div>
</template>

<script>
import DropTarget from 'vue-react-dnd/DropTarget'
import Colors from './Colors'

export default {
  name: 'TargetBox',
  mixins: [DropTarget],

  data () {
    return {
      isOver: false,
      canDrop: false,
      draggingColor: null,
      lastDroppedColor: null
    }
  },

  computed: {
    backgroundColor () {
      switch (this.draggingColor) {
        case Colors.YELLOW:
          return 'lightgoldenrodyellow'
        case Colors.BLUE:
          return 'lightblue'
        default:
          return '#fff'
      }
    },
    opacity () {
      return !!this.isOver
    }
  },

  dropTarget: {
    type () {
      return [Colors.YELLOW, Colors.BLUE]
    },
    specs: {
      drop (monitor) {
        this.lastDroppedColor = monitor.getItemType()
      }
    },
    collect (connect, monitor) {
      this.isOver = monitor.isOver()
      this.canDrop = monitor.canDrop()
      this.draggingColor = monitor.getItemType()
    }
  }
}
</script>

<style lang="scss" scoped>
.target-box {
    border: 1px solid gray;
    height: 15rem;
    width: 15rem;
    padding: 2rem;
    text-algin: center;
    opacity: 0.7;

    &.is-over {
        opacity: 1;
    }
}
</style>
