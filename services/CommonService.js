import Api from '@/services/Api'
export default {
  fetchCities: (data = { id: 0 }) => Api.post('common/getArea', data)
}
