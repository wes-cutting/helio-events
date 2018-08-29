// Follows after the TemplateSelect.js page
//     or
// Selected from CourseDetails.js page

// Updates the course with specifics
// Add Events via the CourseEvent.js component
// Update Page

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'

 class CourseSettings extends Component {
  state = {
    id: this.props.id,
    template: this.props.template,
    name: this.props.name,
    start: this.props.start.split('.')[0],
    isFinished: this.props.isFinished
  }

   render() {
     return (
       <div className="pa4 flex justify-center bg-white">
         <form onSubmit={this.handlePost}>
           <h1>Update Course</h1>
           Template: {this.state.template.name}
           <br/>
           <br/>
           Course Name:<input
             autoFocus
             className="w-100 pa2 mt2 mb3 br2 b--black-20 bw1"
             onChange={e => this.setState({ name: e.target.value })}
             placeholder="Name"
             type="text"
             value={this.state.name}
           />
           Start Date:<input
             type="datetime-local"
             className="db w-100 ba bw1 b--black-20 pa2 br2 mt2 mb3"
             // cols={50}
             onChange={e => this.setState({ start: e.target.value })}
             placeholder="Start Date"
             // rows={8}
             value={this.state.start}
           />
           <input
             type="checkbox"
             onChange={e => this.setState({ isFinished: e.target.value })}
           /> Is Finished
           <br/>
           <br/>
           {/*<input*/}
             {/*className={`pa3 bg-black-10 bn ${this.state.start &&*/}
             {/*this.state.name &&*/}
             {/*'dim pointer'}`}*/}
             {/*disabled={!this.state.start || !this.state.name }*/}
             {/*type="submit"*/}
             {/*value="Update"*/}
           {/*/>*/}
           <a className="f6 pointer" onClick={this.props.history.goBack}>
             or cancel update
           </a>
         </form>
       </div>
     )
   }

   handlePost = async e => {
     e.preventDefault()
     console.log("balls")
     const { name, start } = this.state
     const { templateID } = this.state
     await this.props.updateCourseMutation({
       variables: { name, start, templateID },
     })
     this.props.history.replace('/courses')
   }
 }

const UPDATE_COURSE_MUTATION = gql`
  mutation UpdateCourseMutation($name: String!, $start: DateTime!, $templateID: ID!) {
    updateCourse(name: $name, start: $start, template: $templateID) {
      id
      name
      start
      template{
        name
      }
    }
  }
`

// const DELETE_COURSE = gql`
//   mutation deleteCourse($id: ID!) {
//     deleteCourse(id: $id) {
//       id
//     }
//   }
// `

const UpdateCourseWithMutation = graphql(UPDATE_COURSE_MUTATION, {
  name: 'updateCourseMutation',
})(CourseSettings)

export default withRouter(UpdateCourseWithMutation)




//
//    render() {
//      return (
//        <div className="pa4 flex justify-center bg-white">
//          <form onSubmit={this.handlePost}>
//            <h1>Create Course</h1>
//            Template: {this.props.templateName}
//            <br/>
//            Course Name:
//            <input
//              autoFocus
//              className="w-100 pa2 mv2 br2 b--black-20 bw1"
//              onChange={e => this.setState({ name: e.target.value })}
//              placeholder="Name"
//              type="text"
//              value={this.state.name}
//            />
//            Start Date:
//            <input
//              type="datetime-local"
//              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
//              // cols={50}
//              onChange={e => this.setState({ start: e.target.value })}
//              placeholder="Start Date"
//              // rows={8}
//              value={this.state.start}
//            />
//            <input
//              className={`pa3 bg-black-10 bn ${this.state.start &&
//              this.state.name &&
//              'dim pointer'}`}
//              disabled={!this.state.start || !this.state.name }
//              type="submit"
//              value="Create"
//            />
//            <a className="f6 pointer" onClick={this.props.history.goBack}>
//              or cancel
//            </a>
//          </form>
//        </div>
//      )
//    }
//
//    handlePost = async e => {
//      e.preventDefault()
//      const { name, start } = this.state
//      const { templateID } = this.state
//      await this.props.createCourseMutation({
//        variables: { name, start, templateID },
//      })
//      this.props.history.replace('/courses')
//    }
//  }
//
//
// export default compose(
//   graphql(UPDATE_QUERY, {
//     name: 'updateQuery',
//     options: props => ({
//       variables: {
//         id: props.match.params.id,
//       },
//     }),
//   }),
//   graphql(UPDATE_COURSE, {
//     name: 'updateCourse',
//   }),
//   graphql(DELETE_COURSE, {
//     name: 'deleteCourse',
//   }),
//   withRouter,
// )(CourseSettings)
