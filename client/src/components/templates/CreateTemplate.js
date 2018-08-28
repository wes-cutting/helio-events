// Create a template with Name, Kind, Campus, Days, Hours

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CreateTemplate extends Component {
  state = {
    name: '',
    courseKind: '',
    campus: '',
    hours: '',
    days: [],
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  }
  
  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={ this.handlePost }>
          <h1 className="CT">Create a Template</h1>
          Name:
          <input
            autoFocus
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            onChange={ e => this.setState({ name: e.target.value }) }
            type="text"
            value={ this.state.name }
          />
          Course Kind:
          <select
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
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
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            onChange={ e => this.setState({ campus: e.target.value}) }
            value={ this.state.campus }>
            <option value="PICKONE">Pick one...</option>
            <option value="SLC">SLC</option>
            <option value="DRAPER">DRAPER</option>
          </select>
          Hours:
          <input
            className="db w-50 ba bw1 b--black-20 pa2 br2 mb2"
            onChange={ e => this.setState({ hours: e.target.value }) }
            type="number"
            value={ this.state.hours }
          />
          Days:<br/>
            <input
              onChange={ e => this.setState({mon: !this.state.mon}) }
              type="checkbox"/>Mon&nbsp;
            <input
              onChange={ e => this.setState({tue: !this.state.tue}) }
              type="checkbox"/>Tue&nbsp;
            <input
              onChange={ e => this.setState({wed: !this.state.wed}) }
              type="checkbox"/>Wed&nbsp;
            <input
              onChange={ e => this.setState({thu: !this.state.thu}) }
              type="checkbox"/>Thu&nbsp;
            <input
              onChange={ e => this.setState({fri: !this.state.fri}) }
              type="checkbox"/>Fri&nbsp;
            <input
              onChange={ e => this.setState({sat: !this.state.sat}) }
              type="checkbox"/>Sat
          <br/>
          <br/>
          <input
            className={`pa3 bg-black-10 bn ${this.state.name &&
            this.state.courseKind && this.state.campus && this.state.hours && this.state.days &&
            'dim pointer'}`}
            disabled={!this.state.name || !this.state.courseKind || !this.state.campus || !this.state.hours || !this.state.days}
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
    this.setState({days: days})
    e.preventDefault()
    const { name, courseKind, campus, hours } = this.state;
    console.log("name: ", name)
    console.log("courseKind: ", courseKind)
    console.log("campus: ", campus)
    console.log("hours: ", hours)
    console.log("days: ", days)
    await this.props.createTemplateMutation({
      variables: { name, courseKind, campus, hours, days },
    })
    this.props.history.replace('/templates')
  }
}

const CREATE_TEMPLATE_MUTATION = gql`
  mutation CreateTemplateMutation($name: String!, $courseKind: CourseKind!, $campus: Location!, $hours: Int!, $days: [Day!]!) {
    createCourseTemplate(name: $name, courseKind: $courseKind, campus: $campus, hours: $hours, days: $days) {
      id
      name
      courseKind
      campus
      hours
      days
    }
  }
`

const CreateTemplateWithMutation = graphql(CREATE_TEMPLATE_MUTATION, {
  name: 'createTemplateMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreateTemplate)

export default withRouter(CreateTemplateWithMutation)
