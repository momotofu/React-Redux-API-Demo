import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHistoryIfNeeded, invalidateRequest, toggleAccordionItem } from '../actions'
import HistoryAccordion from '../components/history-accordion'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchHistoryIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps
    dispatch(fetchHistoryIfNeeded())
  }

  handleItemClick(id) {
    const { dispatch } = this.props
    dispatch(toggleAccordionItem(id))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateRequest())
    dispatch(fetchHistoryIfNeeded())
  }

  render() {
    const { items, isFetching, lastUpdated } = this.props
    return (
      <div>
          <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <HistoryAccordion accordionItems={items} onItemClick={this.handleItemClick} />
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: items
  } = state.projectHistory || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)