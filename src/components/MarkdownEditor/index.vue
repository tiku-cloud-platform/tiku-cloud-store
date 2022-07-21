<template>
  <div :id="id" ref="tuiEditor" />
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
      editor: null,
      is_screen: true
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
        initialValue: this.initialValue,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'link'], // 'image',
          ['code', 'codeblock'],
          // 添加自定义按钮
          [{
            el: this.createUploadImgButton(),
            tooltip: '上传图片'
          }],
          [{
            el: this.createScreenFull(),
            tooltip: '全屏'
          }]
        ]
      })
      // 监听内容改变事件
      this.editor.on('change', () => {
        // console.log(this.editor.getMarkdown()) // 获取markdown
        // console.log(this.editor.getHTML()) // 获取html
        this.$emit('input', this.editor.getMarkdown())
      })
    },
    createUploadImgButton() {
      const _this = this
      const button = document.createElement('button')
      button.className = 'image toastui-editor-toolbar-icons'
      button.style.margin = '0'
      button.setAttribute('aria-label', 'Insert image')
      button.addEventListener('click', () => {
        this.$modalUpload(function(img) {
          if (_this.editor.isMarkdownMode()) {
            _this.editor.insertText('![](' + img.file_url + ')')
          } else {
            _this.editor.setHTML('<img src=' + img.file_url + ' alt=' + img.file_name + '>')
          }
        }, 1)
      })
      return button
    },
    createScreenFull() {
      const _this = this
      const button = document.createElement('button')
      button.style.margin = '0'
      button.innerHTML = '全屏'
      button.addEventListener('click', () => {
        const element = _this.$refs.tuiEditor
        element.style.background = '#FFF'
        if (_this.is_screen) {
          element.requestFullscreen()
          setTimeout(() => {
            // 获取图片库的dom
            if (document.querySelector('.el-dialog__wrapper')) {
              // 追加到<div :id="id" ref="tuiEditor" />内部去
              this.$refs.tuiEditor.appendChild(document.querySelector('.el-dialog__wrapper'))
            }
          }, 100)
          button.innerHTML = '退出'
          _this.is_screen = false
        } else {
          document.exitFullscreen()
          button.innerHTML = '全屏'
          _this.is_screen = true
        }
      })
      return button
    }
  }
}
</script>

