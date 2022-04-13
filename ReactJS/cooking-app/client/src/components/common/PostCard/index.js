import React from 'react';
import PropTypes from 'prop-types';
// components
import { ServiceButton, MediaBlock } from '../../index';
// services
import { trimWords } from '../../../services/index';
// styles
import './PostCard.scss';
import './PostCard-media.scss';


import sampleImg from '../../../img/benefit1.png';

const PostCard = (props) => {

  return (
    <div className="postcard">
      <div className="postcard__content">

        <div className="postcard__top">
          <img className="postcard__img" src={sampleImg} alt={props.alt}></img>
          {/* <img className="postcard__img" src={props.post.thumbnail} alt={props.alt}></img> */}
        </div>
        
        <div className="postcard__bottom">
          
          <div className="postcard__textblock">
            <div className="postcard__titles">
              <h5 className="postcard__title">{props.post.title}</h5>
              <span className="postcard__mealtype">{props.post.dishType}</span>
            </div>
            
            <p className="postcard__parag">{trimWords(props.post.descr, props.limit)}</p>
          </div>
          
          <div className="postcard__buttons">
            <div className="postcard__actions">
              <ServiceButton 
                type="button"
                classNames={['postcard__btn', 'postcard__btn-add']}
                content="Try it now"
                onClick={() => console.log('link followed')}
              />
              <ServiceButton 
                type="button"
                classNames={['postcard__btn', 'postcard__btn-wishlist']}
                content="Add to wishlist"
                onClick={() => console.log('added to wishlist')}
              />
            </div>

            <div className="postcard__media">
              <MediaBlock 
                views={props.post.views} 
                likes={props.post.likes}
                postId={props.post._id}
                likePost={() => console.log('liked')}
              />
              {/* likePost - function that increase/decrease the likes value */}
            </div>
          </div>
       
        </div>

      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired
};

export default PostCard;
