// Course display view with Name, Template and Start Date
// Meant for listing courses


import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LimitedCourse extends Component {
  render() {
    let name = this.props.LimitedCourse.name
    // if (this.props.isDraft) {
    //   name = `${name} (Draft)`
    // }

    return (
      <Link className="no-underline ma1" to={`/course/${this.props.LimitedCourse.id}`}>
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 fw1 baskerville mt0 lh-title">{name}</h1>
              <p className="f6 f5-l lh-copy">{this.props.LimitedCourse.start}</p>
              {/*<p className="f6 lh-copy mv0">By {this.props.LimitedCourse.author.name}</p>*/}
            </div>
          </div>
        </article>
      </Link>
    )
  }
}
