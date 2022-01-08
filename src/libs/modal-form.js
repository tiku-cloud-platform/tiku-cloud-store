import request from '@/utils/request'
import Vue from 'vue'

let fApi
let unique = 1

const uniqueId = () => ++unique

export default function modalForm(formRequestPromise, config = {}) {
  const h = this.$createElement
  return new Promise((resolve, reject) => {
    formRequestPromise.then(({ data }) => {
      console.log(data)
      data.config.submitBtn = false
      data.config.resetBtn = false
      if (!data.config.form) data.config.form = {}
      if (!data.config.formData) data.config.formData = {}
      data.config.formData = { ...data.config.formData, ...config.formData }
      data.config.form.labelWidth = '120px'
      data.config.global = {
        upload: {
          props: {
            onSuccess(rep, file) {
              if (rep.status === 200) { file.url = rep.data.src }
            }
          }
        }
      }
      data = Vue.observable(data)
      this.$msgbox({
        title: data.title,
        customClass: config.class || 'modal-form',
        message: h('div', { class: 'common-form-create', key: uniqueId() }, [
          h('formCreate', {
            props: {
              rule: data.rule,
              option: data.config
            },
            on: {
              mounted: ($f) => {
                fApi = $f
              }
            }
          })
        ]),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            fApi.submit((formData) => {
              request[data.method.toLowerCase()](data.action.slice(5), formData).then((res) => {
                done()
                this.$message.success(res.message || '提交成功')
                resolve(res)
              }).catch(err => {
                this.$message.error(err.message || '提交失败')
                reject(err)
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            }, () => (instance.confirmButtonLoading = false))
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    }).catch((e) => {
      this.$message.error(e.message)
    })
  })
}
