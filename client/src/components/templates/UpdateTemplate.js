// Create a template with Name, Kind, Campus, Days, Hours

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class UpdateTemplate extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    courseKind: this.props.courseKind,
    campus: this.props.campus,
    hours: this.props.hours,
    days: this.props.days,
    mon: this.props.days.includes("MONDAY"),
    tue: this.props.days.includes("TUESDAY"),
    wed: this.props.days.includes("WEDNESDAY"),
    thu: this.props.days.includes("THURSDAY"),
    fri: this.props.days.includes("FRIDAY"),
    sat: this.props.days.includes("SATURDAY"),
  }
  
  render() {
    return (
      <div className="pa4 flex justify-center">
        <form onSubmit={ this.handlePost }>
          <h1 className="CT">Update a Template</h1>
          Name:
          <input
            autoFocus
            className="db w-100 ba b--black-20 pa2 br2 mb2 bg-yellow"
            // style={inputStyles}
            onChange={ e => this.setState({ name: e.target.value }) }
            type="text"
            value={ this.state.name }
          />
          Course Kind:
          <select
            className="db w-100 ba b--black-20 pa2 br2 mb2 bg-yellow"
            onChange={ e => this.setState({ courseKind: e.target.value })}
            value={ this.state.courseKind }>
            <option value="PICKONE">Pick one...</option>
            <option value="IMMERSIVE">IMMERSIVE</option>
            <option value="PART_ONE">PART ONE</option>
            <option value="PART_TWO">PART TWO</option>
            <option value="QA">QA</option>
            <option value="UI_UX">UI/UX</option>
            <option value="UNITY">UNITY</option>
          </select>
          Campus:
          <select
            className="db w-100 ba b--black-20 pa2 br2 mb2 bg-yellow"
            onChange={ e => this.setState({ campus: e.target.value}) }
            value={ this.state.campus }>
            <option value="PICKONE">Pick one...</option>
            <option value="SLC">SLC</option>
            <option value="DRAPER">DRAPER</option>
          </select>
          Hours:
          <input
            className="db w-50 ba b--black-20 pa2 br2 mb2 bg-yellow"
            onChange={ e => this.setState({ hours: e.target.value }) }
            type="number"
            value={ this.state.hours }
          />
          Days:<br/>
          <input
            onChange={ e => this.setState({mon: !this.state.mon}) }
            checked={this.state.mon}
            type="checkbox"/>Mon&nbsp;
          <input
            onChange={ e => this.setState({tue: !this.state.tue}) }
            checked={this.state.tue}
            type="checkbox"/>Tue&nbsp;
          <input
            onChange={ e => this.setState({wed: !this.state.wed}) }
            checked={this.state.wed}
            type="checkbox"/>Wed&nbsp;
          <input
            onChange={ e => this.setState({thu: !this.state.thu}) }
            checked={this.state.thu}
            type="checkbox"/>Thu&nbsp;
          <input
            onChange={ e => this.setState({fri: !this.state.fri}) }
            checked={this.state.fri}
            type="checkbox"/>Fri&nbsp;
          <input
            onChange={ e => this.setState({sat: !this.state.sat}) }
            checked={this.state.sat}
            type="checkbox"/>Sat
          <br/>
          <br/>
          <input
            className={`pa3 bg-black-10 bn bg-yellow br2 ${this.state.name &&
            this.state.courseKind && this.state.campus && this.state.hours && this.state.days &&
            'dim pointer'}`}
            disabled={!this.state.name || !this.state.courseKind || !this.state.campus || !this.state.hours || !this.state.days}
            type="submit"
            value="Update"
          />&nbsp;
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }
  
  handlePost = async e => {
    let days = []
    if (this.state.mon) {
      days.push("MONDAY")
    }
    if (this.state.tue) {
      days.push("TUESDAY")
    }
    if (this.state.wed) {
      days.push("WEDNESDAY")
    }
    if (this.state.thu) {
      days.push("THURSDAY")
    }
    if (this.state.fri) {
      days.push("FRIDAY")
    }
    if (this.state.sat) {
      days.push("SATURDAY")
    }
    // this.setState({days: days})
    e.preventDefault()
    const { id, name, courseKind, campus, hours } = this.state;
    await this.props.updateTemplateMutation({
      variables: { id, name, courseKind, campus, hours, days },
    })
    this.props.history.replace('/templates')
  }
}

const UPDATE_TEMPLATE_MUTATION = gql`
  mutation UpdateTemplateMutation($id: ID!, $name: String!, $courseKind: CourseKind!, $campus: Location!, $hours: Int!, $days: [Day!]!) {
    updateCourseTemplate(id: $id, name: $name, courseKind: $courseKind, campus: $campus, hours: $hours, days: $days) {
      id
      name
      courseKind
      campus
      hours
      days
    }
  }
`

const UpdateTemplateWithMutation = graphql(UPDATE_TEMPLATE_MUTATION, {
  name: 'updateTemplateMutation', // name of the injected prop: this.props.createDraftMutation...
})(UpdateTemplate)

export default withRouter(UpdateTemplateWithMutation)
