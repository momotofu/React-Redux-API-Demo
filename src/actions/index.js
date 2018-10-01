import fetch from 'isomorphic-fetch'

/**
  History accordion
  */

export const TOGGLE_ACCORDION_ITEM = 'TOGGLE_ACCORDION_ITEM'

export const toggleAccordionItem = (id) => {
  return {
    type: TOGGLE_ACCORDION_ITEM,
    id
  }
}

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
    return fetch('https://private-29abaa-tenrox.apiary-mock.com/changelist')
      .then(response => response.json())
      .then(json => dispatch(receiveHistory(json)))
  }
}

function shouldFetchHistory(state) {
  const history = state.projectHistory
  if (history.isFetching) {
    return false
  } else if (!history.lastUpdated) {
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
    historyItems: json,
    timeStamp: Date.now()
  }
}
