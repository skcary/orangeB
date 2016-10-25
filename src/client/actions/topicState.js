import fetch from 'isomorphic-fetch'

export const TOPIC_CHANGE_STATUS = 'TOPIC_CHANGE_STATUS' // list details
export const TOPIC_CHANGE_PAGE = 'TOPIC_CHANGE_PAGE'

export const REQUEST_TOPIC_START = 'REQUEST_TOPIC_START'
export const REQUEST_TOPIC_SUCCESS = 'REQUEST_TOPIC_SUCCESS'
export const REQUEST_TOPIC_ERROR = 'REQUEST_TOPIC_ERROR'

export const REQUEST_TOPICS_START = 'REQUEST_TOPICS_START'
export const REQUEST_TOPICS_SUCCESS = 'REQUEST_TOPICS_SUCCESS'
export const REQUEST_TOPICS_ERROR = 'REQUEST_TOPICS_ERROR'

export const changeStatus = status => ({
  type: TOPIC_CHANGE_STATUS,
  status
})

export const changePage = (status, page) => ({
  type: TOPIC_CHANGE_PAGE,
  status,
  page
})

export const requestTopicsStart = status => ({
  type: REQUEST_TOPICS_START,
  status
})

export const requestTopicsSuccess = (status, data) => ({
  type: REQUEST_TOPICS_SUCCESS,
  status
})

export const requestTopicsError = (status, error) => ({
  type: REQUEST_TOPICS_ERROR,
  status,
  error
})

export const requestTopicStart = status => ({
  type: REQUEST_TOPIC_START,
  status
})

export const requestTopicSuccess = (status, data) => ({
  type: REQUEST_TOPIC_SUCCESS,
  status
})

export const requestTopicError = (status, error) => ({
  type: REQUEST_TOPIC_ERROR,
  status,
  error
})

const fetchTopics = status => dispatch => {
  dispatch(requestTopicsStart(status))
  return fetch(`/a/topic/1`)
    .then(response => response.json())
    .then(json => dispatch(requestTopicsSuccess(status, json)))
    .catch(e => dispatch(requestTopicsError(status, e)))
}

const shouldFetchTopics = (state, status) => {
  const posts = state.topicsByPage[status]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchTopicsIfNeeded = status => (dispatch, getState) => {
  if (shouldFetchTopics(getState(), status)) {
    return dispatch(fetchTopics(status))
  }
}
