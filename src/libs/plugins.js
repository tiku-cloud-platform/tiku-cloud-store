import Vue from 'vue'

/**
 * 防止按钮重复点击
 */
Vue.directive('prevent-re-click', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})
