const getters = {
  sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  isShow: state => state.constants.isShow,
  isTop: state => state.constants.isTop,
  isRecommend: state => state.constants.isRecommend,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
