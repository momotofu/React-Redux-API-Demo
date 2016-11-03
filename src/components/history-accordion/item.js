import React, { PropTypes } from 'react'

require('./index.styl')

const AccordionItem = ({
  state,
  open,
  owner,
  onClick,
  timeStarted,
  percentageComplete
}) => (
  <div className='Accordion-item'>
    <div className='Accordion-item-tab'>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {state === 'rejected' || state === 'running' || state === 'accepted' &&
            <h1>firewall</h1>
          }
          {state === 'completed' || state === 'pending' &&
            <h1>build</h1>
          }
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {owner}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {timeStarted}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {state}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {percentageComplete}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {percentageComplete}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {percentageComplete}
        </h4>
      </div>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {percentageComplete}
        </h4>
      </div>
      <button
        className={'Accordion-item-tab-signifier Accordion-signifier' + (open ? ' Accordion-item-tab-signifier-open' : '')}
        onClick={onClick}
      />
    </div>
    <div
      className={'Accordion-item-description' + (open ? ' Accordion-item-description-open' : '')}
    >
    {/*
      <a className={'Accordion-signifier Accordion-item-signifier' + (!demoURL ? ' Accordion-item-signifier-disabled' : '')} href={demoURL ? demoURL : '#'} target='_blank'>{demoURL ? 'Demo' : 'Demo (pending)'}</a>
      <a className={'Accordion-signifier Accordion-item-signifier' + (!githubURL ? ' Accordion-item-signifier-disabled' : '')} href={githubURL ? githubURL : '#'} target='_blank'>{githubURL ? 'GitHub' : 'GitHub (private)'}</a>
    */}
      <p className='Accordion-item-paragraph'>
      </p>
    </div>
  </div>
)

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