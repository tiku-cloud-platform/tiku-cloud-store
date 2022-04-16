<template>
  <div :id="id" />
</template>

<script>
// import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import Editor from '@toast-ui/editor'
// import defaultOptions from './default-options'

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value() {
      return '123'
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        minHeight: '800px',
        language: 'zh-cn',
        theme: 'dark',
        initialValue: this.value
      })
      // 监听内容改变事件
      this.editor.on('change', () => {
        console.log(this.editor.getMarkdown())
        console.log(this.editor.getHTML())
        this.$emit('input', this.editor.getMarkdown())
      })
    }
  }
}
</script>
