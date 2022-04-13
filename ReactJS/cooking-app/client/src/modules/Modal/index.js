import React from 'react';
import PropTypes from 'prop-types';
// components
import { ServiceButton } from '../../components/index';
// styles
import './Modal.scss';

const Modal = (props) => {

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = document.querySelector('.modal__form');

    // collecting data from inputs
    const userDataFields = [...(new FormData(form))];
    const userData = {};

    userDataFields.forEach(fieldGroup => {
      userData[fieldGroup[0]] = fieldGroup[1];
    });

    props.onClick(userData);

    // cleaning inputs
    const inputs = document.querySelectorAll('.modal__form input');
    for(let i = 0;  i < inputs.length; i++) {
      inputs[i].value = '';
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__closer" onClick={props.closeModal}>
          <i className="far fa-times-circle"></i>
        </div>

        <div className="container">
          <h4 className="modal__title">{ props.title }</h4>
          <form className="modal__form" method="post">
            
            { props.children }

            <ServiceButton
              type="submit"
              content="Submit"
              onClick={submitHandler}
              classNames={[ 'modal__submit' ]}
            />
          </form>
        </div>
      </div>

      <div className="modal__bg" onClick={props.closeModal}></div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};



export default Modal;