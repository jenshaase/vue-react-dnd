<template>
  <TargetBox v-bind:lastDroppedColor="lastDroppedColor" v-on:dropped="handleDrop">
  </TargetBox>
</template>

<script>
import Colors from './Colors'
import TargetBox from './TargetBox'

export default {
  name: 'StatefulTargetBox',
  components: {
    TargetBox
  },

  data () {
    return {
      lastDroppedColor: null
    }
  },

  methods: {
    handleDrop (color) {
      this.lastDroppedColor = color
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
