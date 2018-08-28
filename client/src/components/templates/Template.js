// Single Template View
// Update and Delete icons, components sent to Modal

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Template extends Component {
  render() {
    let name = this.props.courseTemplate.name
    // if (this.courseTemplate.isDraft) {
    //   name = `${name} (Template)`
    // }
    return (
      <Link className="no-underline ma1" to={`/template/${this.props.courseTemplate.id}`}>
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 fw1 baskerville mt0 lh-title">{name}</h1>
              <p className="f6 f5-l lh-copy">{this.props.courseTemplate.courseKind}</p>
              <p className="f6 f5-l lh-copy">{this.props.courseTemplate.campus}</p>
              <p className="f6 f5-l lh-copy">{this.props.courseTemplate.hours}</p>
              <p className="f6 f5-l lh-copy">{this.props.courseTemplate.days}</p>
              {/*<p className="f6 lh-copy mv0">{this.props.post.author.name}</p>*/}
            </div>
          </div>
        </article>
      </Link>
    )
  }
}
