import React from 'react'
import { shallow, mount, render } from 'enzyme'

import * as ACTIONS from '../actions'

describe('Redux actions should be strings and should conform to the redux paradigm', function() {
  it('Toggle accordion should return object', function() {
    expect(ACTIONS.toggleAccordionItem('abc')).toEqual({
      'type': 'TOGGLE_ACCORDION_ITEM',
      'id': 'abc'
    })
  })

  it('Invalidate request should return object', function() {
    expect(ACTIONS.invalidateRequest()).toEqual({
      'type': 'INVALIDATE_REQUEST'
    })
  })

  it('Type should be string', function() {
    expect(ACTIONS.REQUEST_HISTORY).toEqual('REQUEST_HISTORY')
    expect(ACTIONS.INVALIDATE_REQUEST).toEqual('INVALIDATE_REQUEST')
    expect(ACTIONS.RECEIVE_HISTORY).toEqual('RECEIVE_HISTORY')
    expect(ACTIONS.TOGGLE_ACCORDION_ITEM).toEqual('TOGGLE_ACCORDION_ITEM')
  })
})