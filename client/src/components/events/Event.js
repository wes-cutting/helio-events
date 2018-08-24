// Single Event View
// Update and Delete icons, components sent to modal

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Event extends Component {
  render() {
    let name = this.props.event.name
    // if (this.props.isDraft) {
    //   name = `${name} (Event)`
    // }

    return (
      <Link className="no-underline ma1" to={`/event/${this.props.event.id}`}>
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 fw1 baskerville mt0 lh-title">{name}</h1>
              <p className="f6 f5-l lh-copy">{this.props.event.eventKind}</p>
              <p className="f6 f5-l lh-copy">{this.props.event.date}</p>
              <p className="f6 f5-l lh-copy">{this.props.event.desc}</p>
              {/*<p className="f6 lh-copy mv0">By {this.props.event.author.name}</p>*/}
            </div>
          </div>
        </article>
      </Link>
    )
  }
}
