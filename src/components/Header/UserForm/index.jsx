// User Form
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';
import Axios from 'axios';

export default function UserForm(props) {
  const { active } = props;
  const [user, setUSer] = useState({ email: "", password: "" })
  const handleChange = (e) => {
    setUSer({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    Axios.post('http://localhost:7000/api/user/login', user)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          localStorage.setItem("token", JSON.stringify(res.data.authToken))

        }
        else {
          alert(res.data.message)
        }

      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <form onSubmit={handleSubmit} className={`user-form ${active ? 'active' : ''}`}>
      <h3>login now</h3>
      <div className="box">
        <input name='email' onChange={handleChange} type="email" placeholder="your email" />
      </div>
      <div className="box">
        <input name='password' onChange={handleChange} type="password" placeholder="your password" />
      </div>
      <p>
        forgot your password
        {' '}
        <a href="/">click here</a>
      </p>
      <p>
        don&apos;t have an account
        {' '}
        <a href="/">create now</a>
      </p>
      <button type="submit" className="btn">
        login now
      </button>
    </form>
  );
}
UserForm.propTypes = {
  active: PropTypes.bool,
}.isRequired;