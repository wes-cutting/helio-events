// List view of LimitedCourse.js elements
// Shows Calendar of Courses

import React, { Component, Fragment } from 'react'
import LimitedCourse from './LimitedCourse'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class Courses extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.coursesQuery.refetch()
    }
  }

  // componentDidMount() {
  //   this.props.subscribeToNewFeed()
  // }

  render() {
    if (this.props.coursesQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Courses</h1>
        </div>
        {this.props.coursesQuery.courses &&
        this.props.coursesQuery.courses.map(course => (
          <LimitedCourse
            key={course.id}
            LimitedCourse={course}
            refresh={() => this.props.coursesQuery.refetch()}

          />
        ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const COURSES_QUERY = gql`
  query CoursesQuery {
    courses {
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


export default graphql(COURSES_QUERY, {
  name: 'coursesQuery',
  options: {
    fetchPolicy: 'network-only',
  },

})(Courses)
