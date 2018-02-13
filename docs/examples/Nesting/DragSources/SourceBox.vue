<template>
  <div class="source-box"
       v-dragSource
       v-bind:class="{dragging: isDragging}"
       v-bind:style="{'background-color': backgroundColor, cursor: cursor}">
    <input
       type="checkbox"
       v-model:checked="forbidDrag" />
    <small>Forbid drag</small>
    <slot></slot>
  </div>
</template>

<script>
import DragSource from 'vue-react-dnd/DragSource'
import Colors from './Colors'

export default {
  name: 'SourceBox',
  props: ['color'],
  mixins: [DragSource],

  data () {
    return {
      isDragging: false,
      forbidDrag: false
    }
  },

  computed: {
    backgroundColor () {
      switch (this.color) {
        case Colors.YELLOW:
          return 'lightgoldenrodyellow'
        case Colors.BLUE:
          return 'lightblue'
        default:
          return ''
      }
    },
    cursor () {
      return (this.forbidDrag) ? 'default' : 'move'
    }
  },

  dragSource: {
    type () {
      return this.color
    },
    specs: {
      canDrag () {
        return !this.forbidDrag
      },

      beginDrag () {
        return {}
      }
    },
    collect (connect, monitor) {
      this.isDragging = monitor.isDragging()
    }
  }
}
</script>

<style lang="scss" scoped>
.source-box {
    border: 1px solid gray;
    padding: 0.5rem;
    margin: 0.5rem;

    &.dragging {
        opacity: 0.4
    }
}
</style>
