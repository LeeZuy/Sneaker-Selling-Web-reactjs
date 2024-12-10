import React from 'react';
import './Blog.css';
import blog_image from '../Assets/blog.jpg'

const Blog = () => {
  return (
    <div className='blog'>
        <div className="blog-left">
            <img src={blog_image} alt="" />
        </div>
        <div className="blog-right">
            <h1>Blogs/News</h1>
            <p>Communications - Event organization - Products</p>
            <button>Check Now</button>
        </div>
    </div>
  )
}

export default Blog