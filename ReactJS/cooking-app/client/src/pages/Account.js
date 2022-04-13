import React from 'react';
// modules
import { Header } from '../modules/index';
// components
import { AccountContent } from '../components/index';


const Account = (props) => {
  const recipes = [
    {
      views: "132",
      likes: "12",
      title: "new title 1",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cceb540c4389d5",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1",
      authorId: '5ef863555be3c34aa04ffsfddf10'
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2",
      descr: "new descr 2",
      _id: "5eb25dec36cceb540c4389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2",
      authorId: '5ef863555be3c34aa04fdf10'
    },
    {
      views: "132",
      likes: "12",
      title: "new title 1 Русский заголовок",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cceb540c4389d215",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1",
      authorId: '5ef863555be3c34aa03124fdf10'
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2 Русский заголовок",
      descr: "new descr 2",
      _id: "5eb25dec36cceb540c42389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2",
      authorId: '5ef863555be3c34aa04fdf10'
    },
    {
      views: "132",
      likes: "12",
      title: "new title 1 Русский заголовок",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      _id: "5eb25dec36cc32eb540c4389d5",
      dishType: "test 1",
      thumbnail: "url to thumbnail 1",
      authorId: '5ef863555be3c34aa04fdf10'
    },
    {
      views: "312",
      likes: "132",
      title: "new title 2",
      descr: "new descr 2",
      _id: "5eb25dec36cceb532140c4389d522",
      dishType: "test 2",
      thumbnail: "url to thumbnail 2",
      authorId: '5ef863555be3c34aa04fdf10231'
    }
  ];
  
  return (
    <React.Fragment>
      <Header />
      <AccountContent recipes={recipes} wishlistRecipes={recipes} />
    </React.Fragment>
  );
}

export default Account;
