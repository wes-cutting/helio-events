// This is the Create Course page
// Select a template
// Fill in the name
// Select a start date

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class TemplateSelect extends Component {
  state= {
    template: this.props.template,
    name: '',
    start: '',
    templateID: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Course</h1>
          {/*<select>*/}
            {/*className="w-100 pa2 mv2 br2 b--black-20 bw1"*/}
            {/*onChange={e => this.setState({ template: e.target.value })}*/}
            {/*placeholder="Select Template"*/}
            {/*type="text"*/}
            {/*value={this.state.template}*/}
          {/*</select>*/}
        <br/>
          Course Name:
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />
          Start Date:
          <input
            type="datetime-local"
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            // cols={50}
            onChange={e => this.setState({ start: e.target.value })}
            placeholder="Start Date"
            // rows={8}
            value={this.state.start}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.start &&
            this.state.name &&
            'dim pointer'}`}
            disabled={!this.state.start || !this.state.name }
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
    const { name, start } = this.state
    const { templateID } = this.state
    await this.props.createCourseMutation({
      vaiables: { name, start, templateID },
    })
    this.props.history.replace('/create')
  }
}

const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourseMutation($name: String!, $start: String!, $templateID: String!) {
    createCourse(name: $name, start: $start, templateID: $templateID) {
      id
      name
      start
      templateID
    }
  }
`

const TemplateSelectWithMutation = graphql(CREATE_COURSE_MUTATION, {
  name: 'createCourseMutation',
})(TemplateSelect)

export default withRouter(TemplateSelectWithMutation)
