import React from 'react';
import PropTypes from 'prop-types';
// modules
import { RecipeContainer, PopularPosts } from '../../../modules/index';
// styles
import './AccountContent.scss';
import './AccountContent-media.scss';


const AccountContent = (props) => {
  
  return (
    
    <div className="account section">
      <div className="container">
        <div className="account__content">
          
          <div className="account__left">

            <RecipeContainer title="Your Own Recipes" recipes={props.recipes} />
            <RecipeContainer title="Your Wishlist" recipes={props.wishlistRecipes} />

          </div>

          <div className="account__right">
            <PopularPosts title="Popular Recipes" posts={props.recipes} limit={3} />
          </div>
        
        </div>
      </div>
    </div>
  );
};

AccountContent.propTypes = {
  recipes: PropTypes.array.isRequired,
  wishlistRecipes: PropTypes.array.isRequired
};

export default AccountContent;
