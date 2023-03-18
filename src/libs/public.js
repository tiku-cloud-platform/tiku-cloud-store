/**
 * 删除提示弹窗
 * @param title
 * @returns {Promise<unknown>}
 */
export function modalSure(title) {
  return new Promise((resolve, reject) => {
    this.$confirm(`${title || '此操作将永久删除该数据'}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(action => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}

export function publishWeChat(title) {
  return new Promise((resolve, reject) => {
    this.$confirm(`${title || '是否确认发布到微信小程序平台'}, 是否继续?`, '提示', {
      confirmButtonText: '确定发布',
      cancelButtonText: '取消发布',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(action => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}

/**
 * 弹出输入对话框
 * @param title
 * @returns {Promise<unknown>}
 */
export function modePromptBox(title, defaultValue) {
  return new Promise((resolve, reject) => {
    this.$prompt(title, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: defaultValue !== '' && defaultValue ? defaultValue : '',
      inputPattern: /^\s*[\s\S]{1,20}\s*$/,
      inputErrorMessage: '请输入分组名称'
    }).then(({ value }) => {
      resolve(value)
    }).catch(() => {
      this.$message({ type: 'info', message: '取消输入' })
    })
  })
}

export function handleDealFilter(arr, key, replaceKey) {
  const newArr = []
  arr.forEach((item, index) => {
    for (let i = 0; i < key.length; i++) {
      item[key] = item[replaceKey]
    }
    newArr.push(item)
  })
  return newArr
}

// export class modePromptBox {
//   modePromptBox: modePromptBox
// }
