<template>
  <div class="box-drag-preview">
     <Box v-bind:title="title" v-bind:yellow="tickTock" />
  </div>
</template>

<script>
import Box from './Box'

export default {
  name: 'BoxDragPreview',
  props: ['title'],
  components: {
    Box
  },

  data () {
    return {
      tickTock: false,
      interval: null
    }
  },

  mounted () {
    this.interval = setInterval(this.tick.bind(this), 500)
  },

  beforeDestory () {
    clearInterval(this.interval)
  },

  methods: {
    tick () {
      this.tickTock = !this.tickTock
    }
  }
}
</script>

<style lang="scss" scoped>
.box-drag-preview {
    display: inline-block;
    transform: rotate(-7deg);
    -webkit-transform: rotate(-7deg);
}
</style>
