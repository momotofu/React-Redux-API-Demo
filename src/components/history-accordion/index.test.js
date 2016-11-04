import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import jsdom from 'jsdom'

import Accordion from './index'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

var items =
[{
  "open": false,
  "itemID": 'a9asf98h98ahsfoi13',
  "buildID": "Tenrox-R1_1235",
  "itemState": "pending",
  "owner": "samy",
  "timeStarted": 1478128607000,
  "percentageComplete": 77.1,
  "metrics": {
  "test": 64,
  "maintainability": 53,
  "security": 64,
  "workmanship": 72,
  "isCompleted": true
  },
  "build": {
    "timeStamp": 1478128607000,
    "isCompleted": true
  },
  "unitTest": {
    "passed": 142,
    "failed": 10,
    "coveredPercentage": 76,
    "testsPassed": 73,
    "isCompleted": true
  },
  "functionalTest": {
    "passed": 142,
    "failed": 10,
    "coveredPercentage": 76,
    "testsPassed": 68,
    "isCompleted": true
  },
  "result": {
    "status": "find_issue"
  }
},
{
  "open": false,
  "itemID": 'a9asf9asdf1398ahsfoi13',
  "buildID": "Tenrox-R1_1235",
  "itemState": "pending",
  "owner": "samy",
  "timeStarted": 1478128607000,
  "percentageComplete": 77.1,
  "metrics": {
  "test": 64,
  "maintainability": 53,
  "security": 64,
  "workmanship": 72,
  "isCompleted": true
  },
  "build": {
    "timeStamp": 1478128607000,
    "isCompleted": true
  },
  "unitTest": {
    "passed": 142,
    "failed": 10,
    "coveredPercentage": 76,
    "testsPassed": 73,
    "isCompleted": true
  },
  "functionalTest": {
    "passed": 142,
    "failed": 10,
    "coveredPercentage": 76,
    "testsPassed": 68,
    "isCompleted": true
  },
  "result": {
    "status": "find_issue"
  }
}]

function handleItemClick(id) {
  return
}


describe('Accordion component', function() {
  it('Should match snapshot', function() {
    const wrapper = shallow(<Accordion
                              accordionItems={items}
                              onItemClick={handleItemClick}
                            />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Allows props to be set', () => {
    const wrapper = mount(<Accordion
                            accordionItems={items}
                            onItemClick={handleItemClick}
                            />)
    expect(wrapper.props().accordionItems[1].functionalTest).toEqual({
      "passed": 142,
      "failed": 10,
      "coveredPercentage": 76,
      "testsPassed": 68,
      "isCompleted": true
    })

    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).toEqual('foo')
  })
})