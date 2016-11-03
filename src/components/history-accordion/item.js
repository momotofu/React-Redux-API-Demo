import React, { PropTypes } from 'react'

require('./index.styl')

const AccordionItem = ({
  buildID,
  itemState,
  onClick,
  open,
  owner,
  percentageComplete,
  timeStarted
}) => (
  <div className='Accordion-item'>
    <div className='Accordion-item-tab'>
      <div className='Accordion-item-tab-icon'>
        <span className='Accordion-item-tab-label'>
          {getIcon(itemState)}
        </span>
      </div>
      <div className='Accordion-item-tab-label' onClick={onClick}>
        <div className='Accordion-item-tab-label-title'>
          {buildID}
          <div className={`Accordion-item-tab-signifier ${open ? 'Accordion-item-tab-signifier-open' : ''}`} />
        </div>
        {getSubLabel(itemState, owner, timeStarted)}
      </div>
      <div className='Accordion-item-tab-metric'>
          {itemState}
      </div>
      <div className='Accordion-item-tab-metric'>
          {percentageComplete >= 25 &&
            <span>check</span>
          }
      </div>
      <div className='Accordion-item-tab-metric'>
          {percentageComplete >= 50 &&
            <span>check</span>
          }
      </div>
      <div className='Accordion-item-tab-metric'>
        {percentageComplete >= 75 &&
          <span>check</span>
        }
      </div>
      <div className='Accordion-item-tab-metric'>
        {percentageComplete === 100 &&
          <span>check</span>
        }
      </div>
    </div>
    <div
      className={`Accordion-item-description ${open ? 'Accordion-item-description-open' : ''}`}
    >
      <p className='Accordion-item-paragraph'>
      </p>
    </div>
  </div>
)

function getIcon(itemState) {
  if (itemState === 'rejected' && itemState === 'running' && itemState === 'accepted')
    return <img src="build" />
  else
    return <img src="firewall" />
}

function getSubLabel(itemState, owner, timeStarted) {
  if (itemState !== 'pending' && itemState !== 'complete') {
    return(
      <div className='Accordion-item-tab-label-sub'>
        <span className='Accordion-item-tab-label-owner'>{owner}</span>{ ` modified on ${new Date(timeStarted).toLocaleString()}`}
      </div>
    )
  } else if (itemState === 'pending') {
  } else {
    return (
      <div className='Accordion-item-tab-label-sub'>
      {`build started on ${new Date(timeStarted).toLocaleString()}`}
      </div>
    )
  }
}

AccordionItem.propTypes = PropTypes.shape({
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  buildID: PropTypes.string.isRequired,
  itemState: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  timeStarted: PropTypes.number.isRequired,
  percentageComplete: PropTypes.number.isRequired,
  metrics: PropTypes.shape({
    test: PropTypes.number,
    maintainability: PropTypes.number.isRequired,
    security: PropTypes.number.isRequired,
    workmanship: PropTypes.number.isRequired
  }).isRequired,
  build: PropTypes.shape({
    timeStamp: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  unitTest: PropTypes.shape({
    passed: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    coveredPercentage: PropTypes.number.isRequired,
    testsPassed: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired
  }).isRequired,
  functional_test: PropTypes.shape({
    passed: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    coveredPercentage: PropTypes.number.isRequired,
    testsPassed: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired
  }).isRequired,
  result: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.string
  }).isRequired,
}).isRequired

export default AccordionItem