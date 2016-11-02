import fetch from 'isomorphic-fetch'

/**
  constanst
  */

export const REQUEST_HISTORY = 'REQUEST_HISTORY'
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'
export const INVALIDATE_REQUEST = 'INVALIDATE_REQUEST'

/**
  async handlers
  */

function fetchHistory() {
  return dispatch => {
    dispatch(requestHistory())
    return fetch('http://private-29abaa-tenrox.apiary-mock.com/changelist')
      .then(response => response.json())
      .then(json => dispatch(receiveHistory(json)))
  }
}

function shouldFetchHistory(state) {
  const history = state.projectHistory.items
  if (history.isFetching) {
    return false
  } else if (noHistory.length === 0) {
    return true
  } else {
    return history.didInvalidate
  }
}

export function fetchHistoryIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHistory(getState())) {
      return dispatch(fetchHistory())
    }
  }
}

/**
  affordances
  */

export function invalidateRequest() {
  return {
    type: INVALIDATE_REQUEST,
  }
}

function requestHistory() {
  return {
    type: REQUEST_HISTORY
  }
}

function receiveHistory(json) {
  return {
    type: RECEIVE_HISTORY,
    history: json,
    receivedAt: Date.now()
  }
}