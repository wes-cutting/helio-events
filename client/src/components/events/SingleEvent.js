import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

// import UpdateEvent from './UpdateEvent'

class SingleEvent extends Component {
  render() {
    if (this.props.eventQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { event } = this.props.eventQuery

    let action = this._renderAction(event)

    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{event.name}</h1>
        <p className="black-80 fw3">{event.eventKind}</p>
        <p className="black-80 fw3">{event.date}</p>
        <p className="black-80 fw3">{event.desc}</p>
        {action}
      </Fragment>
    )
  }

  _renderAction = ({ id, name, eventKind, date, desc }) => {
    if (arguments) {
      return (
        <Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.updateEvent(id, name, eventKind, date, desc)}
          >
            Update
          </a>{' '}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteEvent(id)}
          >
            Delete
          </a>
        </Fragment>
      )
    }

    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deleteEvent(id)}
      >
        Delete
      </a>
    )
  }

  deleteEvent = async id => {
    await this.props.deleteEvent({
      variables: { id },
    })
    this.props.history.replace('/events')
  }

  updateEvent = async ( id, name, eventKind, date, desc ) => {
    await this.props.updateEvent({
      variables: { id, name, eventKind, date, desc },
    })
    this.props.history.replace('/updateEvent')
  }
}

const EVENT_QUERY = gql`
  query Events($id: ID!) {
    event(id: $id) {
      id
      name
      eventKind
      date
      desc
    }
  }
`

const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent($id: ID!, $name: String!, $eventKind: EventKind!, $date: DateTime!, $desc: String) {
    updateEvent(id: $id, name: $name, eventKind: $eventKind, date: $date, desc: $desc) {
      id
      name
      eventKind
      date
      desc
    }
  }
`

const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(EVENT_QUERY, {
    name: 'eventQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(UPDATE_EVENT_MUTATION, {
    name: 'updateEvent',
  }),
  graphql(DELETE_EVENT_MUTATION, {
    name: 'deleteEvent',
  }),
  withRouter,
)(SingleEvent)
