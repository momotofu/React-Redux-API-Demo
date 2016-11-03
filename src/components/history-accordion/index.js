import React, { PropTypes } from 'react'
import AccordionItem from './item'

require('./index.styl')

const Accordion = ({accordionItems, onItemClick}) => (
  <div className='Accordion-container'>
    {accordionItems.map((item, index) => {
      console.log('accordionItems: ', accordionItems)
      return (
        <AccordionItem
          key={item.item_id}
          {...item}
          onClick={() => onItemClick(item.item_id)}
        />
      )
    })}
  </div>
)

Accordion.propTypes = {
  accordionItems: PropTypes.arrayOf(PropTypes.shape({
    item_id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    build_id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    time_started: PropTypes.number.isRequired,
    percentage_complete: PropTypes.number.isRequired,
    metrics: PropTypes.shape({
      test: PropTypes.number,
      maintainability: PropTypes.number.isRequired,
      security: PropTypes.number.isRequired,
      workmanship: PropTypes.number.isRequired
    }).isRequired,
    build: PropTypes.shape({
      time_stamp: PropTypes.number.isRequired,
      is_completed: PropTypes.bool.isRequired,
    }).isRequired,
    unit_test: PropTypes.shape({
      passed: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      covered_percentage: PropTypes.number.isRequired,
      tests_passed: PropTypes.number.isRequired,
      is_complete: PropTypes.bool.isRequired
    }).isRequired,
    functional_test: PropTypes.shape({
      passed: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      covered_percentage: PropTypes.number.isRequired,
      tests_passed: PropTypes.number.isRequired,
      is_complete: PropTypes.bool.isRequired
    }).isRequired,
    result: PropTypes.shape({
      status: PropTypes.string.isRequired,
      error: PropTypes.string
    }).isRequired,
  }).isRequired).isRequired,
  onItemClick: PropTypes.func.isRequired
}

export default Accordion