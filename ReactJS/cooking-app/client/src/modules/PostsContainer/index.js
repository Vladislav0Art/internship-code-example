import React from 'react';
import PropTypes from 'prop-types';
// components
import { PostCard } from '../../components/index';

import './PostsContainer.scss';
import './PostsContainer-media.scss';

const PostsContainer = (props) => {
  return (
    <div className="section postsContainer">
      <div className="container">
        <div className="postsContainer__content">
          <h3 className="postsContainer__title">{props.title}</h3>
          
          <div className="postsContainer__posts">
            {
              props.posts.length ? 
                props.posts.map(post => (<PostCard post={post} alt="Image of the meal" key={post._id} limit={28} />))
              :
                <p className="postsContainer__warning">No posts were found.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

PostsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

export default PostsContainer;
