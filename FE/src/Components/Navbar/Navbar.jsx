import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart-icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/dropdownicon.jpg'

const Navbar = () => {

  const [menu,setMenu] = useState("home");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link style={{ textDecoration: 'none' }} to='/'>Trang Chủ</Link> {menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("sanpham")}}><Link style={{ textDecoration: 'none' }} to='/sanpham'>Sản Phẩm</Link> {menu==="sanpham"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("bestseller")}}><Link style={{ textDecoration: 'none' }} to='/bestseller'>Best Seller</Link>{menu==="bestseller"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">

        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Log Out</button>
          : <Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src={cart} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar