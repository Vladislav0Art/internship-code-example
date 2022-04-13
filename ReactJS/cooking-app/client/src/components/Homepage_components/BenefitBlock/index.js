import React from 'react';
import PropTypes from 'prop-types';

import './BenefitBlock.scss';
import './BenefitBlock-media.scss';

const BenefitBlock = (props) => {
  return (
    <div className="section benefit">
      <div className="container">
        <div className={`benefit__content benefit__content-${props.alignment}`}>
          
          <img className="benefit__img" src={props.img} alt={props.alt}></img>
          
          <div className={`benefit__block benefit__block-${props.alignment}`}>
            <div className={`benefit__block-content benefit__block-content-${props.alignment}`}>
              <h4 className="benefit__title">{props.title}</h4>
              <p className="benefit__parag">{props.parag}</p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

BenefitBlock.propTypes = {
  title: PropTypes.string.isRequired,
  parag: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  alignment: PropTypes.string.isRequired
};

export default BenefitBlock;
