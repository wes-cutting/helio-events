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
    if (this.props.postQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { post } = this.props.postQuery

    let action = this._renderAction(post)

    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{post.name}</h1>
        <p className="black-80 fw3">{post.start}</p>
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
            onClick={() => this.publishDraft(id)}
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

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
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
)(CourseDetails)




