// React component that pops up a modal
// This modal displays a component that is given via props
// Modal should be able to exit without performing the operation of the given component

import React from 'react';
import Modal from 'react-modal';

// const customStyles = {
//   content : {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     background: '#1d1d1d',
//     color: '#ffd007',
//   }
// };
Modal.defaultStyles= {
  overlay: {
    position: "fixed",
    top: 0,
    left: 300,
    right: 300,
    bottom: 0,
    // backgroundColor: "#1d1d1d"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    // border: "1px solid #ccc",
    background: "#1d1d1d",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "8px",
    // outline: "none",
    // padding: "20px",
    color: "#ffd007"
  }
}
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class CustomModal extends React.Component {
  constructor() {
    super();
    
    this.state = {
      modalIsOpen: false
    };
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }
  
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    return (
      <div>
        <button onClick={this.openModal} className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer">{this.props.buttonText}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          {this.props.component}
        </Modal>
      </div>
    );
  }
}

export default CustomModal

