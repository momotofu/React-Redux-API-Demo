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
      <div className='Accordion-item-tab-label'>
        <a
          className='Accordion-item-tab-title'
          onClick={onClick}>
          {buildID}
        </a>
        {itemState !== 'pending' || itemState !== 'complete' &&
          <span className='Accordion-item-tab-sub-label'>
            {`${owner} change ${new Date(timeStarted).toLocaleString()}`}
          </span>
        }
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

function getIcon(props) {
  if (props === 'rejected' || props === 'running' || props === 'accepted')
    return <img src="build" />
  else
    return <img src="firewall" />
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