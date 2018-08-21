import axios from 'axios'

export default {
  fetchFunEvents: data => axios.post('experience/inRecruit', data),
  fetchFunEventDetail: data => axios.post('experience/detail', data),
  applyFunEvent: data => axios.post('experience/apply', data),
  fetchAppliedFunEvents: data => axios.post('experience/myApply', data),
  reserveFunEvent: data => axios.post('experience/myApply/book', data),
  fetchComments: data => axios.post('experience/myEvaluation', data),
  addComment: data => axios.post('experience/myEvaluation/add', data)
}
