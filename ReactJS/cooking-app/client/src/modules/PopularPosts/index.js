import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// components
import { PostCard } from '../../components/index';
// styles
import './PopularPosts.scss';
import './PopularPosts-media.scss';

const PopularPosts = (props) => {
  return (
    <div className="popularPosts">
      
      <h3 className="popularPosts__title">{ props.title }</h3>
      
      <div className="popularPosts__content">
        {
          props.posts.map((post, index) => {
            if(index >= props.limit) return null;
            return (<div key={post._id} className="popularPosts__item"><PostCard post={post} alt="Post thumbnail" limit={28} /></div>);
          })
        }
      </div>

      <Link to="/recipes" className="popularPosts__link">Find More</Link>

    </div>
  );
};

PopularPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default PopularPosts;
