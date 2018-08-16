import Api from '@/services/Api'

export default {
  fetchMsgs: data => Api.post('jobuser/message', data)
}
