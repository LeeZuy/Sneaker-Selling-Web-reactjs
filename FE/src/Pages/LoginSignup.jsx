import React, { useState } from 'react';
import './CSS/LoginSignup.css'


const LoginSignup = () => {

  const [state, setState] = useState("Đăng nhập");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const chageHandler = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value })
  }


  const login = async () => {
    console.log("Chức năng đăng nhập", formData);
    let responseData;
    await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Chức năng đăng ký", formData);
    let responseData;
    await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Đăng ký" ? <input name='username' value={formData.username} onChange={chageHandler} type="text" placeholder='Họ & Tên' /> : <></>}
          <input name='email' value={formData.email} onChange={chageHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={chageHandler} type="password" placeholder='Mật Khẩu' />
        </div>
        <button onClick={() => { state === "Đăng nhập" ? login() : signup() }} >Tiếp Tục</button>
        {state === "Đăng ký"
          ? < p className="loginsignup-login">Bạn đã có tài khoản?<span onClick={() => { setState("Đăng nhập") }}> Đăng nhập </span></p>
          : <p className="loginsignup-login">Bạn có muốn tạo tài khoản?<span onClick={() => { setState("Đăng ký") }}> Đăng ký </span></p>
        }


        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Đồng ý với các điều khoản.</p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignup