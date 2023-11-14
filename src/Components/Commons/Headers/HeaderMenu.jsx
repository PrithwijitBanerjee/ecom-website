import React from 'react'
import "../../../Css/headerMenu.css";
import { TbGps} from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
const HeaderMenu = () => {
  return (
    <>
      <header>
        <nav class="navbar">
          <div class="logo desktop-logo desktop-logo-all">
            <a href="#!" className="anchorLogo"><img src="https://prod.aaw.com/media/logo/stores/4/logo_1.png" title="" alt="" width="170"/></a>
          </div>
          <ul className='navigation'>
            <li><a href="#!">new</a></li>
            <li><a href="#!">men</a></li>
            <li><a href="#!">women</a></li>
            <li><a href="#!">kids</a></li>
            <li><a href="#!">brands</a></li>
            <li><a href="#!">raffle</a></li>
            <li style={{backgroundColor:'red', color:'white',padding:'5px 20px',borderRadius:'10px',marginBottom:'2px'}}><a href="#!">sale</a></li>
            <li><a href="#!">gift cards</a></li>
          </ul>
          <ul class="nav-links">
            <li><a href="#!"><TbGps size={30}/></a></li>
            <li><a href="#!"><FaHeart size ={30}/></a></li>
            <li><a href="#!"><LuUser2 size={30}/></a></li>
            <li><a href="#!"><BiShoppingBag size={30}/></a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default HeaderMenu