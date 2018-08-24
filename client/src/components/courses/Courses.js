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
            isDraft={!course.isPublished}
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
      name
      start
      isFinished
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FeedSubscription {
    feedSubscription {
      node {
        id
        text
        title
        isPublished
        author {
          name
        }
      }
    }
  }
`

export default graphql(COURSES_QUERY, {
  name: 'coursesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewFeed: params => {
        return props.feedQuery.subscribeToMore({
          document: FEED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
            const newPost = subscriptionData.data.feedSubscription.node
            if (prev.feed.find(post => post.id === newPost.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              feed: [...prev.feed, newPost],
            })
          },
        })
      },
    }),
})(Courses)
