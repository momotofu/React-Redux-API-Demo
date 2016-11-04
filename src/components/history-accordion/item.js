import React, { PropTypes } from 'react'

require('./index.styl')

const AccordionItem = ({
  buildID,
  itemState,
  onClick,
  open,
  owner,
  percentageComplete,
  timeStarted,
  metrics,
  build,
  unitTest,
  functionalTest
}) => (
  <div className='Accordion-item'>
    <div
      className={`Accordion-item-tab ${itemState === 'pending' ? 'Accordion-item-tab-disabled' : ''}`}
      onClick={itemState !== 'pending' ? onClick : null}
      >
      <div className='Accordion-item-tab-label'>
        <div className='Accordion-item-tab-icon-container'>
          {getIcon(itemState)}
        </div>
        <div className='Accordion-item-tab-label-container'>
          <div className='Accordion-item-tab-label-title'>
            {buildID}
          </div>
          {getSubLabel(itemState, owner, timeStarted)}
        </div>
      </div>
      <div className='Accordion-item-tab-status'>
        {getItemState(itemState)}
      </div>
      {itemState !== 'pending' &&
        <div className='Accordion-item-tab-metrics'>
          <div className='Accordion-item-tab-metric'>
            {getTabProgressBar(0, 25, percentageComplete, metrics.isCompleted)}
          </div>
          <div className='Accordion-item-tab-metric'>
            {getTabProgressBar(26, 50, percentageComplete, build.isCompleted)}
          </div>
          <div className='Accordion-item-tab-metric'>
            {getTabProgressBar(51, 75, percentageComplete, unitTest.isCompleted)}
          </div>
          <div className='Accordion-item-tab-metric'>
            {getTabProgressBar(76, 100, percentageComplete, functionalTest.isCompleted)}
          </div>
        </div>
      }
      {itemState !== 'pending' &&
        <div className='Accordion-item-tab-signifier-container'>
          <div className={`Accordion-item-tab-signifier entypo-down-open ${open ? 'Accordion-item-tab-signifier-open' : ''}`} />
        </div>
      }
    </div>
      <div className={`Accordion-item-description ${open ? 'Accordion-item-description-open' : ''}`}>
        {itemState !== 'pending' &&
          <div className='Accordion-item-description-card'>
            {getCardProgressBar(80, 'green', 'entypo-thermometer', 'test')}
            {getCardProgressBar(80, 'green', 'entypo-thermometer', 'test')}
            {getCardProgressBar(80, 'red', 'entypo-thermometer', 'test')}
            {getCardProgressBar(80, 'green', 'entypo-thermometer', 'test')}
          </div>
        }
      </div>
  </div>
)

function getIcon(itemState) {
  if (itemState === 'rejected' || itemState === 'running' || itemState === 'accepted')
    return  <span className="Accordion-item-tab-icon entypo-flow-parallel"></span>
  else
    return  <span className="Accordion-item-tab-icon entypo-publish"></span>
}

function getSubLabel(itemState, owner, timeStarted) {
  if (itemState !== 'pending' && itemState !== 'completed') {
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

function getItemState(itemState) {
  if (itemState === 'pending') {
    return <span className='Accordion-item-tab-status-icon-pending entypo-arrows-ccw'></span>
  } else if (itemState === 'running') {
    return (
      <div>
        <span className='Accordion-item-tab-status-icon-dot-1 entypo-dot'></span>
        <span className='Accordion-item-tab-status-icon-dot-2 entypo-dot'></span>
        <span className='Accordion-item-tab-status-icon-dot-3 entypo-dot'></span>
      </div>
    )
  } else {
    return <span>{itemState}</span>
  }
}

function getCardProgressBar(percentageComplete, color, icon, label) {
    if (icon) {
      return (
        <div className='Accordion-item-description-card-metric-row'>
          <span className={icon} />
          <div className='Accordion-item-description-card-metric-progress-bar' data-label={label}>
            <span className={`Accordion-item-description-card-metric-progress-bar-meter 'Accordion-item-description-card-metric-progress-bar-meter-${color}`} style={{width:`${80}%`}}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className='Accordion-item-description-card-metric-row'>
          <div className='Accordion-item-description-card-metric-progress-bar' data-label={label}>
            <span className={`Accordion-item-description-card-metric-progress-bar-meter 'Accordion-item-description-card-metric-progress-bar-meter-${color}`} style={{width:`${80}%`}}/>
          </div>
        </div>
      )
    }
}

function getTabProgressBar(min, threshold, percentageComplete, failed) {
  if (percentageComplete >= threshold) {
    return (
      <div className={`Accordion-item-tab-metric-progress-bar ${failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
        <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${100}%`}}></span>
      </div>
    )
  } else if (percentageComplete < min) {
   return (
      <div className={`Accordion-item-tab-metric-progress-bar ${failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
        <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${0}%`}}></span>
      </div>
    )
  } else {
    return (
      <div className={`Accordion-item-tab-metric-progress-bar ${failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
        <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${percentageComplete}%`}}></span>
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
    workmanship: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired
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
    isCompleted: PropTypes.bool.isRequired
  }).isRequired,
  functionalTest: PropTypes.shape({
    passed: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    coveredPercentage: PropTypes.number.isRequired,
    testsPassed: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }).isRequired,
  result: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.string
  }).isRequired,
}).isRequired

export default AccordionItem