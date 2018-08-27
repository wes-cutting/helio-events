// Follows after the TemplateSelect.js page
//     or
// Selected from CourseDetails.js page

// Updates the course with specifics
// Add Events via the CourseEvent.js component
// Update Page

import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

 class CourseSettings extends Component {
  state = {
    id: this.props.id,
    template: this.props.template,
    name: this.props.name,
    start: this.props.start,
    event: this.props.event,
  }
    updateCourseMutation = gql`
        mutation updateCourse($id: ID, $template: String!, $name: String!, $start: Int!, $event: String!) {
            updateCourse (
                where: {id: $id},
                data: {name: $name, template: $template, start: $start, event: $event}
            ){
            id
            name
            template
            start
            event
        }
    }
  `

  updateComp = () => {
    return (
      <Fragment>
          <TextField type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
          <br/>
          <TextField type="text" value={this.state.template} onChange={event => this.setState({template: event.target.value})}/>
          <br/>
          <input type="datetime-local" value={this.state.start} onChange={event => this.setState({start: parseInt(event.target.value)})}/>
          <br/>
          <TextField type="text" value={this.state.event} onChange={event => this.setState({event: event.target.value})}/>
          <br/>
          <input type="checkbox" id="myCheck"/>
      </Fragment>
    )
  }

  render () {
    const update= this.updateComp()
    return (
      <Mutation mutation={this.updateCourseMutation}>
        {(updateCourse, {data}) => (
          <form onSubmit={event => {
            event.preventDefault()
            if(this.state.idUpdating){
              updateCourse({
                  variables: {
                    id: this.state.id,
                    name: this.state.name,
                    template: this.state.template,
                    start: this.state.start,
                    event: this.state.event
                  }
              })
              this.setState({buttonText: "Update"})
              window.location.reload(true)
              } else {
              this.setState({buttonText: "Submit"})
              }
              this.setState({isUpdating: !this.state.isUpdating })
              }}>
                  {this.state.isUpdating ? update : null}
                  <input style={style} type="submit" size="medium" variant="contained">{this.state.buttonText}</input>
          </form>
              )}
          </Mutation>
        )
      }
    }

const UPDATE_QUERY =gql`
  query updateQuery($id: ID!) {
    updateCourse(id: $id) {
      id
      template
      name
      start
      event
      isFinished
    }
  }
`
const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!) {
    updateCourse(id: $id, template: $template, name: $name, start: $start, event: $event) {
      id
      template
      name
      start
      event
      isFinished
    }
  }
`

const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(UPDATE_QUERY, {
    name: 'updateQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(UPDATE_COURSE, {
    name: 'updateCourse',
  }),
  graphql(DELETE_COURSE, {
    name: 'deleteCourse',
  }),
  withRouter,
)(CourseSettings)
