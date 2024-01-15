const getters = {
  sidebar: state => state.app.sidebar, // 取app里的属性
  device: state => state.app.device,
  token: state => state.user.token, // 取user里的属性
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId
}
export default getters
