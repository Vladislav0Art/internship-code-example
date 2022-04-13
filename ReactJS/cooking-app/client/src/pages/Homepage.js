import React from 'react';
import { connect } from 'react-redux';
// actions
import { ModalActions } from '../actions/index';
// components
import { Main, BenefitBlock, RegisterBlock } from '../components/index';
// modules
import { Header, PostsContainer } from '../modules/index';


// temp data
import firstBenefitImage from '../img/benefit1.png'; 
import secondBenefitImage from '../img/benefit2.png';

const Homepage = (props) => {

  const posts = [
    {
      views: "132",
      likes: "12",
      title: "new title 1",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cceb540c4389d5",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1"
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2",
      descr: "new descr 2",
      _id: "5eb25dec36cceb540c4389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2"
    },
    {
      views: "132",
      likes: "12",
      title: "new title 1",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cceb540c4389d215",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1"
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2",
      descr: "new descr 2",
      _id: "5eb25dec36cceb540c42389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2"
    },
    {
      views: "132",
      likes: "12",
      title: "new title 1",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cc32eb540c4389d5",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1"
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2",
      descr: "new descr 2",
      _id: "5eb25dec36cceb532140c4389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2"
    }
  ];


  return (
    <React.Fragment>
      <Header />
      <Main />
      
      <BenefitBlock 
        alignment="right" 
        img={firstBenefitImage} 
        alt="Photo of food" 
        title="Healthy eating shouldn’t be a hassle." 
        parag="Cook delicious and healthy meals in a few minutes and try something new every day." 
      />

      <BenefitBlock
        alignment="left" 
        img={secondBenefitImage} 
        alt="Photo of food" 
        title="From the simplest recipes to unbelievable masterpieces." 
        parag="Whether you want to cook for daily perpose or you are passionate about making amazing dishes our collection of recipes will be usefull for everyone."
      />

      <RegisterBlock 
        title="Register now to get unlimited access to hundreds of recipes."
        buttonContent="Sign up for free"
        onClick={props.openRegisterModal}
      />

      <PostsContainer posts={posts} title="Our recent recipes" />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  openRegisterModal: ModalActions.openRegisterModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
