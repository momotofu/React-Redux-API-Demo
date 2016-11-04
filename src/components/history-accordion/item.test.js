'use strict'

import { React }from 'react'
import { dispatch } from 'react-redux'
import { HistoryAccordion } from './index'
import renderer from 'react-test-renderer'

const items =
  [
    {
      "build_id": "Tenrox-R1_1235",
      "state": "pending",
      "owner": "samy",
      "time_started": 1478128607000,
      "percentage_complete": 77.1,
      "metrics": {
        "test": 64,
        "maintainability": 53,
        "security": 64,
        "workmanship": 72,
        "is_completed": true
      },
      "build": {
        "time_stamp": 1478128607000,
        "is_completed": true
      },
      "unit_test": {
        "passed": 142,
        "failed": 10,
        "covered_percentage": 76,
        "tests_passed": 73,
        "is_completed": true
      },
      "functional_test": {
        "passed": 142,
        "failed": 10,
        "covered_percentage": 76,
        "tests_passed": 68,
        "is_completed": true
      },
      "result": {
        "status": "find_issue"
      }
    }
  ]

const handleItemClick = (id) => {
  dispatch(toggleAccordionItem(id))
}

it('renders correctly', () => {
  require('./index').default
  const tree = renderer.create(
    <HistoryAccordion accordionItems={items} onItemClick={this.handleItemClick} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})