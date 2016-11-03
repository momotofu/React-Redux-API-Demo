import React, { PropTypes } from 'react'
import AccordionItem from './item'

require('./index.styl')

const Accordion = ({accordionItems, onItemClick}) => (
  <div className='Accordion-container'>
    {accordionItems.map((item, index) => {
      console.log('accordionItems: ', accordionItems)
      return (
        <AccordionItem
          key={item.itemID}
          {...item}
          onClick={() => onItemClick(item.itemID)}
        />
      )
    })}
  </div>
)

Accordion.propTypes = {
  accordionItems: PropTypes.arrayOf(PropTypes.shape({
    buildID: PropTypes.string.isRequired,
    itemID: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    timeStarted: PropTypes.number.isRequired,
    percentageComplete: PropTypes.number.isRequired,
    metrics: PropTypes.shape({
      maintainability: PropTypes.number.isRequired,
      security: PropTypes.number.isRequired,
      test: PropTypes.number,
      workmanship: PropTypes.number.isRequired
    }).isRequired,
    build: PropTypes.shape({
      isCompleted: PropTypes.bool.isRequired,
      timeStamp: PropTypes.number.isRequired,
    }).isRequired,
    unitTest: PropTypes.shape({
      coveredPercentage: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      isComplete: PropTypes.bool.isRequired,
      passed: PropTypes.number.isRequired,
      testsPassed: PropTypes.number.isRequired
    }).isRequired,
    functionalTest: PropTypes.shape({
      coveredPercentage: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      isComplete: PropTypes.bool.isRequired,
      passed: PropTypes.number.isRequired,
      testsPassed: PropTypes.number.isRequired
    }).isRequired,
    result: PropTypes.shape({
      error: PropTypes.string,
      status: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired).isRequired,
  onItemClick: PropTypes.func.isRequired
}

export default Accordion