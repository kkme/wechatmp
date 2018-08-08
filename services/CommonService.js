import Api from '@/services/Api'
export default {
  fetchCities: (data = { id: 0 }) => Api.post('common/getArea', data),
  fetchPositions: data => Api.post('common/getPosition', data),
  fetchMetroPlatforms: data => Api.post('common/getMetroplat', data),
  fetchDistricts: data => Api.post('common/getDistrict', data),
  uploadFile: data => Api.post('common/upload', data)
}
