// Adding events to courses while in the course settings page
// Events:
//   - Orientation
//   - Vacations
//   - Workshops
//   - Graduation

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CourseEvent extends Component {
  state = {
    name: '',
    desc: '',
    eventKind: '',
    date: ''
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Course Event</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />
          <select
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ eventKind: e.target.value })}
            placeholder="Type"
            value={this.state.eventKind}
          >
            <option value="GRADUATION">GRADUATION</option>
            <option value="ORIENTATION">ORIENTATION</option>
            <option value="VACATION">VACATION</option>
            <option value="WORKSHOP">WORKSHOP</option>
          </select>
          <input
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ date: e.target.value })}
            placeholder="Date"
            type="datetime-local"
            value={this.state.date}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ desc: e.target.value })}
            placeholder="Description"
            rows={8}
            value={this.state.desc}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.name &&
            this.state.eventKind && this.state.date && this.state.desc &&
            'dim pointer'}`}
            disabled={!this.state.name || !this.state.eventKind || !this.state.date || !this.state.desc }
            type="submit"
            value="Create"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { name, eventKind, date, desc } = this.state
    await this.props.createEventMutation({
      variables: { name, eventKind, date, desc },
    })
    this.props.history.replace('/events')
  }
}

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation($name: String!, $eventKind: EventKind!, $date: DateTime!, $desc: String) {
    createEvent(name: $name, eventKind: $eventKind, date: $date, desc: $desc) {
      id
      name
      eventKind
      date
      desc
    }
  }
`

const CreateEventWithMutation = graphql(CREATE_EVENT_MUTATION, {
  name: 'createEventMutation', // name of the injected prop: this.props.createDraftMutation...
})(CourseEvent)

export default withRouter(CreateEventWithMutation)
