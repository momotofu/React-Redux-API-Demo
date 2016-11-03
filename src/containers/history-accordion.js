import { connect } from 'react-redux'
import { toggleAccordionItem } from '../actions'
import Accordion from '../components/history-accordion'

const defaultItem = [{
  "demoURL": "#",
  "description": "Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.",
  "githubURL": "#",
  "language": "javascript",
  "open": false,
  "tabLabel": "Coming soon",
  "tabSubLabel": "Language example"
  }]

const mapStateToProps = (state) => {
  const items = getVisibleAccordionItems(state.projectHistory)

  return {
    accordionItems: items.length > 1 ? items : defaultItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id) => {
      dispatch(toggleAccordionItem(id))
    }
  }
}

const HistoryAccordion = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accordion)

export default HistoryAccordion