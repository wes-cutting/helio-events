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
  }
    updateCourseMutation = gql`
        mutation updateCourse($id: ID, $template: String!, $name: String!, $start: Int!) {
            updateCourse (
                where: {id: $id},
                data: {name: $name, template: $template, start: $start}
            ){
            id
            name
            template
            start
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
                    start: this.state.start
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

const POST_QUERY =gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      name
      start
      isFinished
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(POST_QUERY, {
    name: 'postQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),

  graphql(DELETE_MUTATION, {
    name: 'deleteCourse',
  }),
  withRouter,
)(CourseSettings)
