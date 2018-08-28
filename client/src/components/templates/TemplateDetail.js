// List of a single template details

import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import CustomModal from '../shared/Modal'
import TemplateSelect from '../courses/TemplateSelect'
import UpdateTemplate from './UpdateTemplate'

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
        <h1>Template Details</h1>
        <h2 className="f3 black-80 fw4 lh-solid">{courseTemplate.name}</h2>
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
      const updateTemplate = <UpdateTemplate id= { id } name={ name } courseKind={courseKind} campus={campus} hours={hours} days={days}/>
      const createCourse = <TemplateSelect templateId={id} templateName={name}/>
      return (
        <Fragment>
          <CustomModal
            buttonText="Update Template"
            component={updateTemplate}
          />
          <CustomModal
            buttonText="Create Course"
            component={createCourse}
          />{' '}
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
    this.props.history.replace('/updateTemplate')
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

const UPDATE_TEMPLATE_MUTATION = gql`
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

const DELETE_TEMPLATE_MUTATION = gql`
  mutation deleteCourseTemplate($id: ID!) {
    deleteCourseTemplate(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(TEMPLATE_QUERY, {
    name: 'templateQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(UPDATE_TEMPLATE_MUTATION, {
    name: 'updateCourseTemplate',
  }),
  graphql(DELETE_TEMPLATE_MUTATION, {
    name: 'deleteCourseTemplate',
  }),
  withRouter,
)(TemplateDetail)
