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
    initialValue: {
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
  // watch: {
  //   initialValue() {
  //     return 'hello world'
  //   }
  // },
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
        initialValue: this.initialValue
      })
      // 监听内容改变事件
      this.editor.on('change', () => {
        // console.log(this.editor.getMarkdown()) // 获取markdown
        // console.log(this.editor.getHTML()) // 获取html
        this.$emit('input', this.editor.getMarkdown())
      })
    }
  }
}
</script>

<!--<template>
  <editor
    ref="tuiEditor"
    :initialValue="editorText"
    @change="onEditorChange"
  />
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

export default {
  name: 'ToastEditor',
  components: {
    editor: Editor
  },
  props: {
    initialValue: {
      type: String,
      default: 'hello word1'
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
      editorText: '123321'
    }
  },
  // watch: {
  //   initialValue() {
  //     return 'hello word'
  //   }
  // },
  mounted() {
    // this.initEditor()
  },
  methods: {
    onEditorChange() {
      console.log(this.$refs.tuiEditor)
      // const html = this.$refs.tuiEditor.invoke('getHtml')
      // console.log(html)
    },
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        minHeight: '800px',
        language: 'zh-cn',
        theme: 'dark',
        initialValue: this.initialValue
      })

      this.editor.on('change', () => {
        // console.log(this.editor.getMarkdown()) // 获取markdown
        console.log(this.editor.getHTML()) // 获取html&ndash;&gt;
        this.$emit('input', this.editor.getMarkdown())
      })
    }
  }
}
</script>-->

