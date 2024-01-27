import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'GET',
  })
}

export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data
  })
}
