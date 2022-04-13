import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// actions 
import { PostCreationActions } from '../../../actions/index';
// components
import { FormGroup, ServiceButton, Input, Item } from '../../index';
// helpers
import { loadMime } from './helpers';
// additional components
import { Image, Video } from './components/index';
// services
import { Notification } from '../../../services/index';
// styles
import './CreationContent.scss';
import './CreationContent-media.scss';



const CreationContent = (props) => {
  const [dishType, setDishType] = React.useState('');
  const [descr, setDescr] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [ingredients, setIngredients] = React.useState([]);
  const [directions, setDirections] = React.useState([]);
  const [labels, setLabels] = React.useState([]);

  const [images, setImages] = React.useState([]);
  const [imagesUrls, setImagesUrls] = React.useState([]);

  const [thumbnail, setThumbnail] = React.useState(null);
  const [thumbnailUrl, setThumbnailUrl] = React.useState(null);

  const [video, setVideo] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState(null);

  const [error, setError] = React.useState(null);

  // creating new ingredient
  const createIngredient = () => {
    const ingredient = {
      id: uuidv4(),
      text: '',
      isEditing: true
    };
    setIngredients(prevIngredients => [...prevIngredients, ingredient]);
  };


  // switching on edit mode
  const editIngredient = (id) => {
    setIngredients(prevIngredients => prevIngredients.map(item => {
      if(item.id === id) item.isEditing = true;
      return item;
    }));
  };


  // updating ingredient and switching off edit mode
  const updateIngredient = (id, value) => {
    setIngredients(prevIngredients => prevIngredients.map(item => {
      if(item.id === id) {
        if(value !== '') {
          item.isEditing = false;
          item.text = value;
        }
        else {
          setError('Each ingredient has to have a non-empty value');
        }
      }
      return item;
    }));
  };


  // deleting ingredient
  const deleteIngredient = (id) => {
    setIngredients(prevIngredients => prevIngredients.filter(item => item.id !== id));
  };


  // creating new direction
  const createDirection = () => {
    const direction = {
      id: uuidv4(),
      text: '',
      isEditing: true
    };
    setDirections(prevDirections => [...prevDirections, direction]);
  };


  // switching on aditing mode
  const editDirection = (id) => {
    setDirections(prevDirections => prevDirections.map(item => {
      if(item.id === id) item.isEditing = true;
      return item;
    }))
  };

  
  // updating ingredient and switching off edit mode
  const updateDirection = (id, value) => {
    setDirections(prevDirections => prevDirections.map(item => {
      if(item.id === id) {
        if(value !== '') {
          item.isEditing = false;
          item.text = value;
        }
        else {
          setError('Each direction has to have a non-empty value');
        }
      }
      return item;
    }));
  };


  // deleting direction
  const deleteDirection = (id) => {
    setDirections(prevDirections => prevDirections.filter(item => item.id !== id));
  };


  // setting thumbnail image as preview
  const previewThumbnailImage = (input) => {
    if(input.files && input.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);

      reader.addEventListener('load', (event) => {      
        setThumbnailUrl(event.target.result);
      }); 
    }
  };


  // putting images to state and setting images as previews
  const constructAndPreviewImages = async (input) => {
    if(input.files) {
      // array with ids of uploaded images
      const ids = [];
      // current size of array with images
      let currentImagesSize = images.length;
      // current size of array with urls
      let currentUrlsSize = images.length;
      // max size of images array
      const MAX_SIZE_OF_ARRAY = 9;
      
  
      // putting image to state with id
      [...input.files].forEach(async (file, index) => {
        // checking mime type of the file
        const matchesMimeType = await loadMime(file);

        if(currentImagesSize < MAX_SIZE_OF_ARRAY && matchesMimeType) {

          // setting image to state
          const id = uuidv4();
          setImages(prevState => [...prevState, { file, id }]);
          ids.push(id);

          ++currentImagesSize;
        }
        else if(!matchesMimeType) {
          setError('File must be an image type');
        }
        else {
          setError(`Only ${ MAX_SIZE_OF_ARRAY } images can be provided`);
        }

      });


      // previewing image with its state id
      for(let i = 0; i < input.files.length && currentUrlsSize < MAX_SIZE_OF_ARRAY; i++) {
        const file = input.files[i];
        
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        // setting image url to state
        reader.addEventListener('load', (e) => {
          setImagesUrls(prevState => [...prevState, { src: e.target.result, id: ids[i] }]);
        });

        ++currentUrlsSize;
      }

    }
  };


  // setting video as preview
  const previewVideo = (input) => {
    if(input.files && input.files[0] && input.files[0].type.match(/video\/*/)) {
      const reader = new FileReader();

      reader.readAsDataURL(input.files[0]);

      reader.addEventListener('load', (e) => {
        setVideoUrl(e.target.result);
      });
    }
  };


  // showing errors and messages
  React.useEffect(() => {
    if(!error) return;
    Notification(error, "error");

    setError(null);
  }, [error]);


  React.useEffect(() => {
    // console.log(title, dishType, descr, ingredients, directions, labels, images, thumbnail, video);
    // console.log(videoUrl, imagesUrls, thumbnailUrl);
    // console.log(video, images, thumbnail);
  }, [title, dishType, descr, ingredients, directions, images, thumbnail, video, imagesUrls, thumbnailUrl, videoUrl, labels]);


  return (
    <div className="creationContent section">
      <div className="container">
        
        <h3 className="section__title">Create your own recipe and share it with the community</h3>
        
        <form className="creationContent__form">
          <div className="creationContent__content">
            
            <div className="creationContent__left">
              <FormGroup title="Title:" >
                <Input
                  classNames={['creationContent__textinput']}
                  name="title"
                  type="text" 
                  required="required"
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </FormGroup>

              <FormGroup title="Dish name:" >
                <Input 
                  classNames={['creationContent__textinput']}
                  name="dishType"
                  type="text" 
                  required="required"
                  onChange={(e) => setDishType(e.target.value)} 
                />
              </FormGroup>

              <FormGroup title="Description:">
                <textarea 
                  required="required" 
                  className="creationContent__textarea" 
                  onChange={e => setDescr(e.target.value)}
                />
              </FormGroup>

              <FormGroup classNames={['creationContent__group']} title="Uploading thumbnail:">
                <Input
                  onChange={(e) => {
                    previewThumbnailImage(e.target);
                    setThumbnail(e.target.files[0]);
                    e.target.value = null;
                  }} 
                  accept="image/*"
                  multiple="multiple"
                  classNames={["creationContent__input", "creationContent__input-invisible"]}
                  name="thumbnail" 
                  type="file" 
                  id="creationContent__thumbnail" 
                  required="required"
                />

                {
                  thumbnailUrl ? 
                    <Image 
                      src={thumbnailUrl} 
                      deleteImage={() => {
                        setThumbnail(null);
                        setThumbnailUrl(null);
                      }}
                    /> 
                  : 
                    null
                }

                <label className="creationContent__btn" htmlFor="creationContent__thumbnail">Upload thumbnail</label>
              </FormGroup>

              <FormGroup classNames={['creationContent__group']} title="Uploading video (this is optional):">
                <Input 
                  classNames={["creationContent__input", "creationContent__input-invisible"]}
                  name="video" 
                  type="file"
                  accept="video/mp4"
                  id="creationContent__video" 
                  onChange={(e) => {
                    previewVideo(e.target);
                    setVideo(e.target.files[0]);
                    e.target.value = null;
                  }}
                />

                {
                  videoUrl ? 
                    <Video 
                      src={videoUrl}
                      deleteVideo={() => {
                        setVideo(null);
                        setVideoUrl(null);
                      }} 
                    /> 
                  :
                    null
                }

                <label className="creationContent__btn" htmlFor="creationContent__video">Upload video</label>
              </FormGroup>
            </div>

            <div className="creationContent__right">
              <FormGroup classNames={['creationContent__group']} title="Ingredients:">
                <div className="creationContent__ingredients">
                  {
                    ingredients.map(ingredient => {
                      return (
                        <Item
                          key={ingredient.id} 
                          item={ingredient}
                          editItem={editIngredient}
                          updateItem={updateIngredient}
                          deleteItem={deleteIngredient}
                        />
                      );
                    })
                  }
                </div>

                <ServiceButton
                  classNames={['creationContent__btn']} 
                  content="Add new ingredient" 
                  type="button" 
                  onClick={() => createIngredient()}
                />
              </FormGroup>


              <FormGroup classNames={['creationContent__group']} title="Directions:">
                <div className="creationContent__directions">
                  {
                    directions.map(direction => (
                      <Item 
                        key={direction.id}
                        item={direction}
                        editItem={editDirection}
                        updateItem={updateDirection}
                        deleteItem={deleteDirection}
                      />
                    ))
                  }
                </div>

                <ServiceButton
                  classNames={['creationContent__btn']} 
                  content="Add new direction" 
                  type="button" 
                  onClick={() => createDirection()}
                />
              </FormGroup>

              <FormGroup classNames={['creationContent__group']} title="Uploading photos (this is optional):">
                <Input 
                  onChange={e => {
                    constructAndPreviewImages(e.target);
                    e.target.value = null;
                  }}
                  accept="image/*" 
                  id="creationContent__images" 
                  name="images" 
                  type="file" 
                  classNames={["creationContent__input", "creationContent__input-invisible"]} 
                  multiple="multiple"
                />

                <div className="creationContent__imagesContainer">
                  {
                    imagesUrls.length ? 
                      imagesUrls.map(url => 
                        <Image 
                          src={url.src}
                          key={url.id}
                          id={url.id}
                          deleteImage={(id) => {
                            setImages(prevState => prevState.filter(img => img.id !== id));
                            setImagesUrls(prevState => prevState.filter(img => img.id !== id));
                          }}
                          small
                        />)
                    :
                      null
                  }
                </div>

                <label className="creationContent__btn" htmlFor="creationContent__images">Upload photos</label>
              </FormGroup>
            </div>
          
          </div>
        </form>
      
      </div>
    </div>
  );
};


CreationContent.propTypes = {
  state: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    state: {
      ...state.PostCreationReducer
    }
  }
};

const mapDispatchToProps = {
  handleError: PostCreationActions.handleError
};


export default connect(mapStateToProps, mapDispatchToProps)(CreationContent);
