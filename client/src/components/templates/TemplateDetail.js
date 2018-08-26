// List of a single template details

import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

class TemplateDetail extends Component {
  render() {
    if (this.props.templateQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    
    const { courseTemplate } = this.props.templateQuery
    
    let action = this._renderAction(courseTemplate)
    
    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{courseTemplate.name}</h1>
        <p className="black-80 fw3">{courseTemplate.courseKind}</p>
        <p className="black-80 fw3">{courseTemplate.campus}</p>
        <p className="black-80 fw3">{courseTemplate.hours}</p>
        <p className="black-80 fw3">{courseTemplate.days}</p>
        {action}
      </Fragment>
    )
  }
  
  _renderAction = ({ id, name, courseKind, campus, hours, days }) => {
    if (arguments) {
      return (
        <Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.updateCourseTemplate( id, name, courseKind, campus, hours, days )}
          >
            Update
          </a>{' '}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteCourseTemplate(id)}
          >
            Delete
          </a>
        </Fragment>
      )
    }
    
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deleteCourseTemplate(id)}
      >
        Delete
      </a>
    )
  }
  
  deleteCourseTemplate = async id => {
    await this.props.deleteCourseTemplate({
      variables: { id },
    })
    this.props.history.replace('/templates')
  }
  
  updateCourseTemplate = async ( id, name, courseKind, campus, hours, days ) => {
    await this.props.updateCourseTemplate({
      variables: { id, name, courseKind, campus, hours, days },
    })
    this.props.history.replace('/updateEvent')
  }
}

const TEMPLATE_QUERY = gql`
  query courseTemplates($id: ID!) {
    courseTemplate (id: $id) {
      id
      name
      courseKind
      campus
      hours
      days
    }
  }
`

const UPDATE_TEMPLATE = gql`
  mutation updateCourseTemplate($id: ID!, $name: String!, $courseKind: CourseKind!, $campus: Location!, $hours: Int!, $days: [Day!]!) {
    updateCourseTemplate (id: $id, name: $name, courseKind: $courseKind, campus: $campus, hours: $hours, days: {set: $days} ) {
      id
      name
      courseKind
      campus
      hours
      days
    }
  }
`

const DELETE_TEMPLATE = gql`
  mutation deleteCourseTemplate($id: ID!) {
    deleteCourseTemplate(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(TEMPLATE_QUERY, {
    name: 'courseTemplate',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(UPDATE_TEMPLATE, {
    name: 'updateCourseTemplate',
  }),
  graphql(DELETE_TEMPLATE, {
    name: 'deleteCourseTemplate',
  }),
  withRouter,
)(TemplateDetail)
