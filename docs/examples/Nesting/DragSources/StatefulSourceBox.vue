<template>
  <SourceBox v-bind:color="color" v-bind:forbidDrag="forbidDrag" v-on:toggleForbidDrag="onToggleForbidDrag">
    <slot></slot>
  </SourceBox>
</template>

<script>
import SourceBox from './SourceBox'

export default {
  name: 'StatefulSourceBox',
  props: ['color', 'forbidDrag'],
  components: {
    SourceBox
  },

  methods: {
    onToggleForbidDrag (event) {
      this.forbidDrag = !this.forbidDrag
    }
  }
}
</script>
