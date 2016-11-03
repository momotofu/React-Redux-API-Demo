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
    <div className='Accordion-item-tab' onClick={onClick}>
      <div className='Accordion-item-tab-signifier-container'>
        <div className={`Accordion-item-tab-signifier entypo-down-open-big ${open ? 'Accordion-item-tab-signifier-open' : ''}`} />
      </div>
      <div className='Accordion-item-tab-label'>
        <div className='Accordion-item-tab-label-title'>
          {getIcon(itemState)}
          {buildID}
        </div>
        {getSubLabel(itemState, owner, timeStarted)}
      </div>
      <div className='Accordion-item-tab-metric'>
          {itemState}
      </div>
      <div className='Accordion-item-tab-metrics'>
        <div className='Accordion-item-tab-metric'>
          <div className='Accordion-item-tab-metric-progress-bar'>
            {getProgressBar(0, 25, percentageComplete)}
          </div>
        </div>
        <div className='Accordion-item-tab-metric'>
          <div className='Accordion-item-tab-metric-progress-bar'>
            {getProgressBar(26, 50, percentageComplete)}
          </div>
        </div>
        <div className='Accordion-item-tab-metric'>
          <div className='Accordion-item-tab-metric-progress-bar'>
            {getProgressBar(51, 75, percentageComplete)}
          </div>
        </div>
        <div className='Accordion-item-tab-metric'>
          <div className='Accordion-item-tab-metric-progress-bar'>
            {getProgressBar(76, 100, percentageComplete)}
          </div>
        </div>
      </div>
    </div>
    <div className={`Accordion-item-description ${open ? 'Accordion-item-description-open' : ''}`}>
      <p className='Accordion-item-paragraph'>
      </p>
    </div>
  </div>
)

function getIcon(itemState) {
  if (itemState === 'rejected' || itemState === 'running' || itemState === 'accepted')
    return  <span className="Accordion-item-tab-icon entypo-flow-branch"></span>
  else
    return  <span className="Accordion-item-tab-icon entypo-publish"></span>
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

function getProgressBar(min, threshold, percentageComplete) {
  if (percentageComplete >= threshold)
    return <span style={{height:`${100}%`}}></span>
  else if (percentageComplete < min)
    return <span style={{height:`${0}%`}}></span>
  else
    return <span style={{height:`${percentageComplete}%`}}></span>
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