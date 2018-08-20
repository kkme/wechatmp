import Api from '@/services/Api'

export default {
  fetchFunEvents: data => Api.post('experience/inRecruit', data),
  fetchFunEventDetail: data => Api.post('experience/detail', data),
  applyFunEvent: data => Api.post('experience/apply', data),
  fetchAppliedFunEvents: data => Api.post('experience/myApply', data),
  reserveFunEvent: data => Api.post('experience/myApply/book', data),
  fetchComments: data => Api.post('experience/myEvaluation', data),
  addComment: data => Api.post('experience/myEvaluation/add', data)
}
