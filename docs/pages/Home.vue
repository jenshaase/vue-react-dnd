<template>
  <div>
    <h1>Examples</h1>

    <h2>Dustbin</h2>
    <ul>
      <li><router-link to="example/dustbin/single-target">Single Target</router-link></li>
      <li><router-link to="example/dustbin/single-target-in-frame">Single Target in IFrame</router-link></li>
      <li><router-link to="example/dustbin/copy-or-move">Copy or Move</router-link></li>
      <li><router-link to="example/dustbin/multiple-targets">Multiple Targets</router-link></li>
    </ul>

    <h2>DragAround</h2>
    <ul>
      <li><router-link to="example/drag-around/naive">Naive</router-link></li>
      <li><router-link to="example/drag-around/custom-drag-layer">Custom drag layer</router-link></li>
    </ul>

    <h2>Nesting</h2>
    <ul>
      <li><router-link to="example/nesting/drag-sources">Drag sources</router-link></li>
      <li><router-link to="example/nesting/drop-targets">Drop targets</router-link></li>
    </ul>

    <h2>Sortable</h2>
    <ul>
      <li><router-link to="example/sortable/simple">Simple</router-link></li>
      <li><router-link to="example/sortable/cancel-on-drop-outside">Cancel on drop outside</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss">

</style>
