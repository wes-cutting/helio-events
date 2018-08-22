import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

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

  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
      return (
        <Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.updateEvent(id)}
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
    this.props.history.replace('/')
  }

  updateEvent = async id => {
    await this.props.updateEvent({
      variables: { id },
    })
    this.props.history.replace('/')
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
      isPublished
      author {
        name
      }
    }
  }
`

const UPDATE_EVENT = gql`
  mutation update($id: ID!) {
    updateEvent(id: $id) {
      id
      name
      eventKind
      date
      desc
      isPublished
    }
  }
`

const DELETE_EVENT = gql`
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
  graphql(UPDATE_EVENT, {
    name: 'updateEvent',
  }),
  graphql(DELETE_EVENT, {
    name: 'deleteEvent',
  }),
  withRouter,
)(SingleEvent)
