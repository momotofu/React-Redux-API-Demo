import React, { Component, PropTypes } from 'react'

require('./index.styl')
require('../../root-styles/skins/pie-chart.styl')

class AccordionItem extends Component {
  getChartPercentage(passed, failed, normalizer, inverse) {
    var result = Math.round(((passed / (passed + failed) * normalizer) + (inverse ? (-normalizer): 0)))
    if (result < 0)
      return result *-1
    else return result
  }

  getColor(percentage) {
    if (percentage >= 60)
      return 'green'
    else if (percentage >= 40)
      return 'yellow'
    else
      return 'red'
  }

  getIcon(itemState) {
    if (itemState === 'rejected' || itemState === 'running' || itemState === 'accepted')
      return  <span className="Accordion-item-tab-icon entypo-flow-parallel"></span>
    else
      return  <span className="Accordion-item-tab-icon entypo-publish"></span>
  }

  getSubLabel(itemState, owner, timeStarted) {
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

  getItemState(itemState) {
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

  getCardProgressBar(percentageComplete, color, icon, label) {
      if (icon) {
        return (
          <div className='Accordion-item-description-card-metric-row'>
            <span className={`Accordion-item-description-card-metric-progress-bar-icon ${icon}`} />
            <div className='Accordion-item-description-card-metric-progress-bar'>
              <span
                className={`Accordion-item-description-card-metric-progress-bar-meter Accordion-item-description-card-metric-progress-bar-meter-${color === null ? this.getColor(percentageComplete) : color}`}
                style={{width:`${percentageComplete}%`}}
                data-label={label}
                />
            </div>
          </div>
        )
      } else {
        return (
          <div className='Accordion-item-description-card-metric-row'>
            <div className='Accordion-item-description-card-metric-progress-bar'>
              <span
                className={`Accordion-item-description-card-metric-progress-bar-meter Accordion-item-description-card-metric-progress-bar-meter-${color === null ? this.getColor(percentageComplete) : color}`}
                style={{width:`${percentageComplete}%`}}
                data-label={label}
                />
            </div>
          </div>
        )
      }
  }

  getTabProgressBar(min, threshold, percentageComplete, failed) {
    if (percentageComplete >= threshold) {
      return (
        <div className={`Accordion-item-tab-metric-progress-bar ${!failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
          <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${100}%`}}></span>
        </div>
      )
    } else if (percentageComplete < min) {
     return (
        <div className={`Accordion-item-tab-metric-progress-bar ${!failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
          <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${0}%`}}></span>
        </div>
      )
    } else {
      return (
        <div className={`Accordion-item-tab-metric-progress-bar ${!failed ? 'Accordion-item-tab-metric-progress-bar-failed' : ''}`}>
          <span className='Accordion-item-tab-metric-progress-bar-meter' style={{height:`${percentageComplete}%`}}></span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='Accordion-item'>
        <div
          className={`Accordion-item-tab ${this.props.itemState === 'pending' ? 'Accordion-item-tab-disabled' : ''}`}
          onClick={this.props.itemState !== 'pending' ? this.props.onClick : null}
          >
          <div className='Accordion-item-tab-label'>
            <div className='Accordion-item-tab-icon-container'>
              {this.getIcon(this.props.itemState)}
            </div>
            <div className='Accordion-item-tab-label-container'>
              <div className='Accordion-item-tab-label-title'>
                {this.props.buildID}
              </div>
              {this.getSubLabel(this.props.itemState, this.props.owner, this.props.timeStarted)}
            </div>
          </div>
          <div className='Accordion-item-tab-status'>
            {this.getItemState(this.props.itemState)}
          </div>
          {this.props.itemState !== 'pending' &&
            <div className='Accordion-item-tab-metrics'>
              <div className='Accordion-item-tab-metric'>
                {this.getTabProgressBar(0, 25, this.props.percentageComplete, this.props.metrics.isCompleted)}
              </div>
              <div className='Accordion-item-tab-metric'>
                {this.getTabProgressBar(26, 50, this.props.percentageComplete, this.props.build.isCompleted)}
              </div>
              <div className='Accordion-item-tab-metric'>
                {this.getTabProgressBar(51, 75, this.props.percentageComplete, this.props.unitTest.isCompleted)}
              </div>
              <div className='Accordion-item-tab-metric'>
                {this.getTabProgressBar(76, 100, this.props.percentageComplete, this.props.functionalTest.isCompleted)}
              </div>
            </div>
          }
          {this.props.itemState !== 'pending' &&
            <div className='Accordion-item-tab-signifier-container'>
              <div className={`Accordion-item-tab-signifier entypo-down-open ${this.props.open ? 'Accordion-item-tab-signifier-open' : ''}`} />
            </div>
          }
        </div>
          <div className={`Accordion-item-description ${this.props.open ? 'Accordion-item-description-open' : ''}`}>
            {this.props.itemState !== 'pending' &&
              <div className='Accordion-item-description-card'>
                <div className='Accordion-item-description-card-header'>
                  <h1>Metrics</h1>
                </div>
                {this.getCardProgressBar(this.props.metrics.test, null, 'entypo-thermometer', 'test')}
                {this.getCardProgressBar(this.props.metrics.maintainability, null, 'entypo-tools', 'maintainability')}
                {this.getCardProgressBar(this.props.metrics.security, null, 'entypo-lock', 'security')}
                {this.getCardProgressBar(this.props.metrics.workmanship, null, 'entypo-brush', 'workmanship')}
              </div>
            }
            {this.props.itemState !== 'pending' &&
              <div className='Accordion-item-description-card'>
                <div className='Accordion-item-description-card-header'>
                  <h1>Build</h1>
                </div>
                <div className='Accordion-item-description-card-button-container'>
                  <div className='Accordion-item-description-card-button'>
                    <div className='Icon Icon-large Icon-publish' />
                  </div>
                  <div className='Accordion-item-description-card-button'>
                    <div className='Icon Icon-large Icon-bug' />
                  </div>
                </div>
                <div>
                  <span className='Accordion-item-description-card-footer Accordion-item-description-card-footer-label'>
                    Debug
                  </span>
                  <span className='Accordion-item-description-card-footer Accordion-item-description-card-footer-label'>
                    Release
                  </span>
                </div>
                <div className='Accordion-item-description-card-footer'>
                  <p>{new Date(this.props.build.timeStamp).toLocaleString()}</p>
                </div>
              </div>
            }
            {this.itemState !== 'pending' &&
              <div className='Accordion-item-description-card'>
                <div className='Accordion-item-description-card-header'>
                  <h1>Unit Test</h1>
                </div>
                <div
                  className={`Pie-chart-psuedo-container Pie-chart-psuedo-container-${this.getColor(this.getChartPercentage(this.props.unitTest.passed, this.props.unitTest.failed, 100))}`}
                  data-pie={`${this.getChartPercentage(this.props.unitTest.passed, this.props.unitTest.failed, 100)}%`}>
                  <svg className='Pie-chart-container'
                    width='72'
                    height='72'
                  >
                    <circle
                      className='Pie-chart'
                      strokeDasharray={`${this.getChartPercentage(this.props.unitTest.passed, this.props.unitTest.failed, 214, true)}, 211`}
                      r='34'
                      cx='36'
                      cy='36'
                    />
                  </svg>
                  <p className='Pie-chart-label'>Tests passed</p>
                </div>
                {this.getCardProgressBar(this.props.unitTest.coveredPercentage, null, 'entypo-network', 'code covered')}
              </div>
            }
            {this.itemState !== 'pending' &&
              <div className='Accordion-item-description-card'>
                <div className='Accordion-item-description-card-header'>
                  <h1>Functional Test</h1>
                </div>
                <div
                  className={`Pie-chart-psuedo-container Pie-chart-psuedo-container-${this.getColor(this.getChartPercentage(this.props.functionalTest.passed, this.props.functionalTest.failed, 100))}`}
                  data-pie={`${this.getChartPercentage(this.props.functionalTest.passed, this.props.functionalTest.failed, 100)}%`}>
                  <svg className='Pie-chart-container'
                    width='72'
                    height='72'
                  >
                    <circle
                      className='Pie-chart'
                      strokeDasharray={`${this.getChartPercentage(this.props.functionalTest.passed, this.props.functionalTest.failed, 214, true)}, 211`}
                      r='34'
                      cx='36'
                      cy='36'
                    />
                  </svg>
                  <p className='Pie-chart-label'>Tests passed</p>
                </div>
                {this.getCardProgressBar(this.props.functionalTest.coveredPercentage, null, 'entypo-network', 'code covered')}
              </div>
            }
          </div>
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