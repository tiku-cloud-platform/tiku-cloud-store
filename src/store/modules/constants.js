const getDefaultConstants = () => {
  return {
    isShow: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 }
    ],
    isSearch: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 }
    ],
    isTop: [
      { label: '置顶', value: 1 },
      { label: '不置顶', value: 2 }
    ],
    isRecommend: [
      { label: '是', value: 1 },
      { label: '否', value: 2 }
    ]
  }
}

const state = getDefaultConstants()

export default {
  namespaced: true,
  state
}
