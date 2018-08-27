// Course display view for entire course information
// Shows Calendar of Course
// Settings button here that navigates to CourseSettings.js
// Delete button here that pops up a Delete Modal
//
// Corey is making a Figma for this functionality

//Info from DeatilPage


import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'

class CourseDetails extends Component {
  render() {
    if (this.props.courseQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { course } = this.props.courseQuery
    console.log('test', course);
    let action = this._renderAction(course)

    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{course.name}</h1>
        <p className="black-80 fw3">{course.template.name}</p>
        <p className="black-80 fw3">{course.start}</p>
        <ul className="black-80 fw3">{course.events.map(event => (<li>{event.name}</li>))}</ul>
        {action}
      </Fragment>
    )
  }

  _renderAction = ({ id, template, name, start, event }) => {
    if (arguments) {
      return (
        <Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.updateCourse( id, template, name, start, event )}
          >
            Update
          </a>{' '}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteCourse(id)}
          >
            Delete
          </a>
        </Fragment>
      )
    }
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deleteCourse(id)}
      >
        Delete
      </a>
    )
  }

  deleteCourse = async id => {
    await this.props.deleteCourse({
      variables: { id },
    })
    this.props.history.replace('/')
  }

  updateCourse = async ( id, template, name, start, event ) => {
    await this.props.updateCourse({
      variables: { id, template, name, start, event },
    })
    this.props.history.replace('/')
  }
}

const COURSE_QUERY =gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      id
      template {
        id
        name
      }
      name
      start
      events{
        id
        name
      }
      isFinished
    }
  }
`
const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!) {
    updateCourse(id: $id, template: $template, name: $name, start: $start, event: $event) {
      id
      template {
        id
        name
      }
      name
      start
      events{
        id
        name
      }
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
  graphql(COURSE_QUERY, {
    name: 'courseQuery',
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
)(CourseDetails)




