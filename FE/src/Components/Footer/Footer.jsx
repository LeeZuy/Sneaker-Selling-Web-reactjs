import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <ul className="footer-links">
            <li>Giới Thiệu</li>
            <li>Các Chính Sách Hộ Trợ</li>
            <li>Thông Tin Liên Hệ</li>
            <li>Fanpage</li>
        </ul>
        <div className="footer-copyright">
            <hr />
            <p>Copyright © 2024 Sneaker Check. Powered by Zui.</p>
        </div>
    </div>
  )
}

export default Footer