import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
// components
import { MediaBlock, ServiceButton } from '../../../components/index';
// services
import { trimWords } from '../../../services/index';
// styles
import './RecipeItem.scss';
import './RecipeItem-media.scss';

// temp data
import sampleImg from '../../../img/benefit1.png';

const RecipeItem = (props) => {

  return (
    <div className={classNames('recipeItem', props.classNames)}>
      <div className="recipeItem__block">
        <img className="recipeItem__img" src={sampleImg} alt={props.alt}></img>
        {/* <img className="recipeItem__img" src={props.recipe.thumbnail} alt={props.alt}></img> */}
      </div>
      <div className="recipeItem__content">
    
        <div className="recipeItem__top">
          <h5 className="recipeItem__title">{ props.recipe.title }</h5>
          <p className="recipeItem__descr">{ trimWords(props.recipe.descr, props.limit) }</p>
          <MediaBlock 
            likePost={() => console.log('liked')} 
            likes={props.recipe.likes} 
            views={props.recipe.views} 
            postId={props.recipe._id} 
          />
        </div>
    
        <div className="recipeItem__bottom">
          <div className="recipeItem__buttons">
            {
              props.state.isUserLoaded && props.recipe.authorId === props.state.user._id ?
                <ServiceButton classNames={['recipeItem__btn']} content="Edit" type="button" onClick={() => console.log('redirected to edit mode')} />
              :
                null
            }
            <ServiceButton classNames={['recipeItem__btn']} content="Delete" type="button" onClick={() => console.log('Deleted the recipe')} />
            <ServiceButton classNames={['recipeItem__btn']} content="View" type="button" onClick={() => console.log('redirected to view page')} />
          </div>
          <span className="recipeItem__dishtype">{ props.recipe.dishType }</span>
        </div>
    
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};



const mapStateToProps = (state) => {
  return {
    state: {
      ...state.UserReducer
    }
  }
};

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);