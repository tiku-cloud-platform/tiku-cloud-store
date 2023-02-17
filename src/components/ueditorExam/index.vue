<template>
  <div>
    <vue-ueditor-wrap v-model="contents" :config="myConfig" style="width: 100%;" @beforeInit="addCustomDialog" />
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'Index',
  components: { VueUeditorWrap },
  scrollerHeight: {
    content: String,
    default: ''
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    ueditorFromHeight: {
      type: String,
      default: '500'
    }
  },
  data() {
    return {
      contents: this.content,
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: this.ueditorFromHeight, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        UEDITOR_HOME_URL: '/UEditor/',
        maximumWords: 100000,
        toolbars: [
          [
            // 'source', // 源代码
            // 'anchor', // 锚点
            // 'undo', // 撤销
            // 'redo', // 重做
            // 'subscript', // 下标
            // 'fontborder', // 字符边框
            // 'superscript', // 上标
            // 'formatmatch', // 格式刷
            // 'removeformat', // 清除格式
            'cleardoc', // 清空文档
            'unlink', // 取消链接
            'link', // 超链接
            // 'emotion', // 表情
            // 'spechars', // 特殊字符
            // 'searchreplace', // 查询替换
            // 'blockquote', // 引用
            // 'horizontal', // 分隔线
            // 'pasteplain', // 纯文本粘贴模式
            // 'selectall', // 全选
            'bold', // 加粗
            'italic', // 斜体
            'forecolor', // 字体颜色
            // 'backcolor', // 背景色
            'underline', // 下划线
            'strikethrough', // 删除线
            // 'autotypeset', // 自动排版
            // 'touppercase', // 字母大写
            // 'tolowercase', // 字母小写
            // 'indent', // 首行缩进
            'lineheight', // 行间距
            // 'justifyleft', // 居左对齐
            // 'justifyright', // 居右对齐
            // 'justifycenter', // 居中对齐
            // 'justifyjustify', // 两端对齐
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            // 'rowspacingtop', // 段前距
            // 'rowspacingbottom', // 段后距
            // 'insertvideo', // 视频
            // 'map', // Baidu地图
            'fontfamily', // 字体
            'fontsize', // 字号
            // 'paragraph', // 段落格式
            // 'customstyle', // 自定义标题
            // 'insertcode', // 代码语言
            // 'snapscreen', // 截图
            // 'print', // 打印
            'preview', // 预览
            // 'time', // 时间
            // 'date', // 日期
            // 'inserttable', // 插入表格
            // 'deletetable', // 删除表格
            // 'insertrow', // 前插入行
            // 'insertcol', // 前插入列
            // 'mergeright', // 右合并单元格
            // 'mergedown', // 下合并单元格
            // 'deleterow', // 删除行
            // 'deletecol', // 删除列
            // 'splittorows', // 拆分成行
            // 'splittocols', // 拆分成列
            // 'splittocells', // 完全拆分单元格
            // 'deletecaption', // 删除表格标题
            // 'inserttitle', // 插入标题
            // 'mergecells', // 合并多个单元格
            // 'insertparagraphbeforetable', // "表格前插入行"
            // 'edittable', // 表格属性
            // 'edittd', // 单元格属性
            // 'help', // 帮助
            'fullscreen' // 全屏
            // 'directionalityltr', // 从左向右输入
            // 'directionalityrtl', // 从右向左输入
            // 'pagebreak' // 分页
            // 'insertframe' // 插入Iframe
            // 'imagenone' // 默认
            // 'imageleft', // 左浮动
            // 'imageright', // 右浮动
            // 'attachment', // 附件
            // 'imagecenter' // 居中
            // 'wordimage', // 图片转存
            // 'edittip ' // 编辑提示

            // 'background' // 背景
            // 'template' // 模板
            // 'drafts' // 从草稿箱加载

          ]
          // [
          // 'charts', // 图表
          // 'scrawl', // 涂鸦
          // 'music', // 音乐
          // 'webapp', // 百度应用
          // 'gmap', // Google地图
          // ]
        ]
        // serverUrl: 'http://35.201.165.105:8000/controller.php'
      }
    }
  },
  watch: {
    content: function(val) {
      this.contents = this.content
      // this.$emit('input', val)
    },
    contents: function(val) {
      this.$emit('input', val)
    }
  },
  created() {
  },
  methods: {
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI('test-dialog', function(editor, uiName) {
        // 创建 dialog
        const dialog = new window.UE.ui.Dialog({
          // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
          iframeUrl: '/setting/uploadPicture?field=dialog',
          // 需要指定当前的编辑器实例
          editor: editor,
          // 指定 dialog 的名字
          name: uiName,
          // dialog 的标题
          title: '上传图片',
          // 指定 dialog 的外围样式
          cssRules: 'width:1000px;height:620px;padding:20px;'
        })
        this.dialog = dialog
        var btn = new window.UE.ui.Button({
          name: 'dialog-button',
          title: '上传图片',
          cssRules: `background-image: url(@/assets/images/icons.png);background-position: -726px -77px;`,
          onclick: function() {
            // 渲染dialog
            dialog.render()
            dialog.open()
          }
        })
        return btn
      }, 37)
    }
  }
}
</script>

<style scoped>

</style>
