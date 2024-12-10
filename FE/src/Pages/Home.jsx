import React from 'react'
import Carousel from '../Components/Carousel/Carousel'
import './Home.css';
import { useState } from 'react';
import Popular from '../Components/Popular/Popular';
import Blog from '../Components/Blog/Blog';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Home = () => {
  const slides = [
    "https://theme.hstatic.net/200000289033/1000684389/14/slideshow_1.jpg?v=265",
    "https://theme.hstatic.net/200000289033/1000684389/14/slideshow_2.jpg?v=265",
    "https://theme.hstatic.net/200000289033/1000684389/14/slideshow_3.jpg?v=265",
    "https://theme.hstatic.net/200000289033/1000684389/14/slideshow_4.jpg?v=265",
  ]
  return (

     <div>
      <div className="slides">
        <Carousel slides={slides} controls indicators  width="100%"/>
      </div>
        <Popular/>
        <Blog/>
        <NewCollections/>
        <NewsLetter/>
        
      </div>

  )
}

export default Home