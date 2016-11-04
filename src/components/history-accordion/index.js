import React, { PropTypes } from 'react'
import AccordionItem from './item'

if (process.env.NODE_ENV !== 'test') {
  require('./index.styl')
}

const Accordion = ({accordionItems, onItemClick}) => (
  <div className='Accordion-container'>
    <div className='Accordion-container-labels'>
      <span>Changelist/build</span>
      <div className='Accordion-container-labels-metrics'>
        <span className='Accordion-container-labels-metrics-label'>State</span>
        <span className='Accordion-container-labels-metrics-label'>Metrics</span>
        <span className='Accordion-container-labels-metrics-label'>Build</span>
        <span className='Accordion-container-labels-metrics-label'>Unit Test</span>
        <span className='Accordion-container-labels-metrics-label'>Func Test</span>
      </div>
    </div>
    {accordionItems.map((item, index) => {
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
    itemState: PropTypes.string.isRequired,
    timeStarted: PropTypes.number.isRequired,
    percentageComplete: PropTypes.number.isRequired,
    metrics: PropTypes.shape({
      maintainability: PropTypes.number.isRequired,
      security: PropTypes.number.isRequired,
      test: PropTypes.number,
      workmanship: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired
    }).isRequired,
    build: PropTypes.shape({
      isCompleted: PropTypes.bool.isRequired,
      timeStamp: PropTypes.number.isRequired,
    }).isRequired,
    unitTest: PropTypes.shape({
      coveredPercentage: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      passed: PropTypes.number.isRequired,
      testsPassed: PropTypes.number.isRequired
    }).isRequired,
    functionalTest: PropTypes.shape({
      coveredPercentage: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
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