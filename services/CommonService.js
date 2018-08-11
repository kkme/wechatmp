import Api from '@/services/Api'
export default {
  fetchCities: (params = { pid: 0 }) => Api.get('common/getArea', { params }),
  fetchPositions: data => Api.post('common/getPosition', data),
  fetchMetroPlatforms: data => Api.post('common/getMetroplat', data),
  fetchDistricts: data => Api.post('common/getDistrict', data),
  fetchDateTime: () => Api.post('common/getDateTime'),
  duibaLogin: () => Api.post('duiba/login'),
  uploadFile: data => Api.post('common/upload', data)
}
