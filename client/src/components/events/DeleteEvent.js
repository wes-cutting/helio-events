import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

class DeleteEvent extends Component {
  state = {
    id: this.props.id
  }

  render() {
    return (
      <Fragment className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Are you sure?</h1>
          <input
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onClick={this.props.id.deleteEvent}
            type="Submit"
            value="Yes"
          />
          <input
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onClick={this.props.history.goBack}
            type="Submit"
            value="Cancel"
          />
        </form>
      </Fragment>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { id } = this.state
    await this.props.deleteEvent({
      variables: { id },
    })
    this.props.history.replace('/events')
  }

  deleteEvent = async id => {
    await this.props.deleteEvent({
      variables: { id },
    })
    this.props.history.replace('/events')
  }
}

const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(DELETE_EVENT_MUTATION, {
    name: 'deleteEvent',
  }),
  withRouter,
)(DeleteEvent)
