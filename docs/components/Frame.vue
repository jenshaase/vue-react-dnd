<script>
import Vue from 'vue'

export default {
  name: 'frame',
  beforeUpdate () {
    this.iframeApp.children = Object.freeze(this.$slots.default)
  },
  methods: {
    renderChildren () {
      let frameEl = this.$el || this.$refs.frame
      const children = this.$slots.default
      const win = frameEl.contentWindow
      const doc = frameEl.contentDocument
      const body = doc.body
      const el = document.createElement('div')

      body.append(el)

      const iframeApp = new Vue({
        name: 'iframeApp',
        provide () {
          return {
            window: win,
            document: doc
          }
        },
        data () {
          return {
            children: Object.freeze(children)
          }
        },
        render (h) {
          return h('div', this.children)
        }
      })

      iframeApp.$mount(el)

      this.iframeApp = iframeApp
    }
  },
  render (h) {
    return h('iframe', { on: { load: this.renderChildren }, ref: 'frame' })
  }
}
</script>
