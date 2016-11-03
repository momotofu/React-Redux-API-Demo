import React, { PropTypes } from 'react'

require('./index.styl')

const AccordionItem = ({
  tabLabel,
  tabSubLabel,
  onClick,
  open,
  demoURL,
  githubURL,
  description
}) => (
  <div className='Accordion-item'>
    <div className='Accordion-item-tab'>
      <div className='Accordion-item-tab-label'>
        <h4 className='Accordion-item-tab-label-title'>
          {tabLabel}
        </h4>
        <h6 className='Accordion-item-tab-label-sub'>
          {tabSubLabel}
        </h6>
      </div>
      <button
        className={'Accordion-item-tab-signifier Accordion-signifier' + (open ? ' Accordion-item-tab-signifier-open' : '')}
        onClick={onClick}
      />
    </div>
    <div
      className={'Accordion-item-description' + (open ? ' Accordion-item-description-open' : '')}
    >
      <a className={'Accordion-signifier Accordion-item-signifier' + (!demoURL ? ' Accordion-item-signifier-disabled' : '')} href={demoURL ? demoURL : '#'} target='_blank'>{demoURL ? 'Demo' : 'Demo (pending)'}</a>
      <a className={'Accordion-signifier Accordion-item-signifier' + (!githubURL ? ' Accordion-item-signifier-disabled' : '')} href={githubURL ? githubURL : '#'} target='_blank'>{githubURL ? 'GitHub' : 'GitHub (private)'}</a>
      <p className='Accordion-item-paragraph'>
      {description}
      </p>
    </div>
  </div>
)

AccordionItem.propTypes = PropTypes.shape({
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
}).isRequired

export default AccordionItem