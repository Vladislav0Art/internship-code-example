import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// components
import { RecipeItem } from '../../components/index';
// styles
import './RecipeContainer.scss';
import './RecipeContainer-media.scss';

const RecipeContainer = (props) => {
  return (
    <div className="RecipeContainer">
      <h3 className="RecipeContainer__title">{ props.title }</h3>
      <div className="RecipeContainer__content">
        {
          props.recipes.map(recipe => (<RecipeItem key={recipe._id} recipe={recipe} alt='Recipe thumbnail' limit={75} />))
        }
      </div>
    </div>
  );
};

RecipeContainer.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired
};

export default RecipeContainer;
