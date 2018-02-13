<template>
  <div class="box"
       v-bind:class="{ yellow: yellow }">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: ['title', 'yellow']
}
</script>

<style lang="scss" scoped>
.box {
    border: 1px solid gray;
    padding: 0.5rem 1rem;
    cursor: move;
    background-color: white
}

.box.yellow {
    background-color: yellow
}
</style>
