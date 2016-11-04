import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import jsdom from 'jsdom'

import AccordionItem from './item'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

var item =
{
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
}

function handleItemClick(id) {
  return
}


describe('AccordionItem component', function() {
  it('Should match snapshot', function() {
    const wrapper = shallow(<AccordionItem
                                key={item.itemID}
                                {...item}
                                onClick={handleItemClick}
                              />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Allows props to be set', () => {
    const wrapper = mount(<AccordionItem
                              key={item.itemID}
                              {...item}
                              onClick={handleItemClick}
                            />)
    expect(wrapper.props().functionalTest).toEqual({
      "passed": 142,
      "failed": 10,
      "coveredPercentage": 76,
      "testsPassed": 68,
      "isCompleted": true
    })

    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).toEqual('foo')
  })

  it('Method referential transparency', () => {
    const wrapper = mount(<AccordionItem
                                key={item.itemID}
                                {...item}
                                onClick={handleItemClick}
                              />)
    expect(wrapper.instance()
      .getCardProgressBar(18, 'red', 'icon-name', 'label'))
      .toEqual(
        <div className='Accordion-item-description-card-metric-row'>
          <span className="Accordion-item-description-card-metric-progress-bar-icon icon-name" />
          <div className='Accordion-item-description-card-metric-progress-bar'>
            <span
              className="Accordion-item-description-card-metric-progress-bar-meter Accordion-item-description-card-metric-progress-bar-meter-red"
              style={{"width":"18%"}}
              data-label="label"
              />
          </div>
        </div>)
  })

  it('Math methods', () => {
    const wrapper = mount(<AccordionItem
                                key={item.itemID}
                                {...item}
                                onClick={handleItemClick}
                              />)
    expect(wrapper.instance()
      .getChartPercentage(101442.9, 1009813, 100, false))
      .toBeLessThanOrEqual(100)
  })
})