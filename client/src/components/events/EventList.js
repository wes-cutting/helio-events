// List view of events, passed in as an Array of Events
// Can be either Global events or Course specific events
// Sorted by soonest to latest

import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

import Event from './Event'

class EventList extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.eventsQuery.refetch()
    }
  }

  render() {
    if (this.props.eventsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Events</h1>
        </div>
        {this.props.eventsQuery.events &&
        this.props.eventsQuery.events.map(event => (
          <Event
            key={event.id}
            event={event}
            refresh={() => this.props.eventsQuery.refetch()}
            isDraft={!event.isPublished}
          />
        ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const EVENTS_QUERY = gql`
  query EventsQuery {
    events {
      id
      name
      desc
      eventKind
      date
    }
  }
`

export default graphql(EVENTS_QUERY, {
  name: 'eventsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(EventList)
