import React from 'react';
import './NewsLetter.css';
import email_image from '../Assets/email.jpg'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <div className="email-image">
            <img src={email_image} alt="" />
        </div>
        <div className="email-text">
        <h1>Đăng Ký</h1>
        <p>Đăng ký ngay để nhận thông tin ưu đãi đặc biệt tại sneakers check.</p>
        <div>
            <input type="email" placeholder='Nhập email của bạn'/>
            <button>Gửi</button>
        </div>
        </div>
    </div>
  )
}

export default NewsLetter