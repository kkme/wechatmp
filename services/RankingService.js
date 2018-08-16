import Api from '@/services/Api'

export default {
  fetchTeamRanking: data => Api.post('/ranking/teamrank', data),
  fetchUserRanking: data => Api.post('/ranking/userrank', data)
}
