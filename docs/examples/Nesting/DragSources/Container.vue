<template>
  <div class="wrapper">
    <div class="sources">
      <SourceBox v-bind:color="Colors.BLUE">
        <SourceBox v-bind:color="Colors.YELLOW">
          <SourceBox v-bind:color="Colors.YELLOW" />
          <SourceBox v-bind:color="Colors.BLUE" />
        </SourceBox>
        <SourceBox v-bind:color="Colors.BLUE">
          <SourceBox v-bind:color="Colors.YELLOW" />
        </SourceBox>
      </SourceBox>
    </div>
    <div class="targets">
      <TargetBox />
    </div>
  </div>
</template>

<script>
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'
import DragDropContext from 'vue-react-dnd/DragDropContext'
import HTML5Backend from 'react-dnd-html5-backend'
import Colors from './Colors'

export default {
  name: 'container',
  components: {
    SourceBox,
    TargetBox
  },
  mixins: [DragDropContext(HTML5Backend)],

  data () {
    return {
      Colors: Colors
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
       overflow: hidden;
       clear: both;
       margin: -0.5rem;

       .sources {
           float: left;
       }

       .targets {
           float: left;
           margin-left: 5rem;
           margin-top: 0.5rem;
       }
   }
   </style>
