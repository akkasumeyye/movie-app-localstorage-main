import React from 'react'
import './Navbar.scss'

import { NavLink} from 'react-router-dom'
import {
  AiOutlineFire,
  AiOutlineStar,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";


const Navbar = () => {


  return (
    <div className='nav'>
      <NavLink exact="true" to={"/"} title="Home" activestyle={{ color : '#1976d2' }}>
        <AiOutlineHome/>
      </NavLink>
      <NavLink to={"/search"} title="Search" activestyle={{ color : '#1976d2' }} >
        <AiOutlineSearch/>
      </NavLink>
      <NavLink to={"/popular"} title="Popular" activestyle={{ color : '#1976d2' }}>
        <AiOutlineFire/>
      </NavLink>
      <NavLink to={"/top_rated"} title="Top rated" activestyle={{ color : '#1976d2' }}>
        <AiOutlineStar />
      </NavLink>
      <NavLink to={"/favorite"} title="Favorite" activestyle={{ color : '#1976d2' }}>
        <AiOutlineHeart />
      </NavLink>
    </div>
  );
};

export default Navbar;