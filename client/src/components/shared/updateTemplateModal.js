// Modal should contain data for a single course template

// React component that pops up a modal
// This modal displays a component that is given via props
// Modal should be able to exit without performing the operation of the given component

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Link} from "react-router-dom";
import UpdateTemplate from './templates/UpdateTemplate.js'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#yourAppElement')

class UpdateModal extends React.Component {
  constructor() {
    super();
    
    this.state = {
      modalIsOpen: false
    };
    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }
  
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#1d1d1d';
  }
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    return (
      <div>
        {/*<button onClick={this.openModal} >Open Modal</button>*/}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
          <div>
          <form onSubmit={ this.handlePost }>
            <h1 className="CT">Update Template</h1>
            Name:
            <input
              autoFocus
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              onChange={ e => this.setState({ name: e.target.value }) }
              type="text"
              value={ this.props.courseTemplate.name }
            />
            CourseKind:
            <input
              autoFocus
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              onChange={ e => this.setState({ courseKind: e.target.value }) }
              type="text"
              value={ this.props.courseTemplate.courseKind }
            />
            Campus:
            <input
              autoFocus
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              onChange={ e => this.setState({ campus: e.target.value }) }
              type="text"
              value={ this.props.courseTemplate.campus }
            />
            Hours:
            <input
              autoFocus
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              onChange={ e => this.setState({ hours: e.target.value }) }
              type="text"
              value={ this.props.courseTemplate.hours }
            />
            Days:
            <input
              autoFocus
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              onChange={ e => this.setState({ days: e.target.value }) }
              type="text"
              value={ this.props.courseTemplate.days }
            />
            <br/>
            <br/>
            <input
              className={`pa3 bg-black-10 bn ${this.state.name &&
              this.state.courseKind && this.state.campus && this.state.hours && this.state.days &&
              'dim pointer'}`}
              disabled={!this.state.name || !this.state.courseKind || !this.state.campus || !this.state.hours || !this.state.days}
              type="submit"
              value="Update"
            />
            <a className="f6 pointer" onClick={this.props.history.goBack}>
              or cancel
            </a>
            {/*<button onClick={this.closeModal}>close</button>*/}
          </form>
          </div>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<UpdateModal />, appElement);
