// List of all templates passing in an array of courseTemplates

import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

import Template from './Template'

class TemplateList extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.templatesQuery.refetch()
    }
  }
  
  render() {
    if (this.props.templatesQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    
    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Templates</h1>
        </div>
        {this.props.templatesQuery.courseTemplates &&
          this.props.templatesQuery.courseTemplates.map(courseTemplate => (
          <Template
            key={courseTemplate.id}
            courseTemplate={courseTemplate}
            refresh={() => this.props.templatesQuery.refetch()}
            isDraft={!courseTemplate.isPublished}
          />
        ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const TEMPLATE_QUERY = gql`
  query TemplatesQuery {
    courseTemplates {
      id
      name
      courseKind
      campus
      hours
      days
    }
  }
`

export default graphql(TEMPLATE_QUERY, {
  name: 'templatesQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(TemplateList)
