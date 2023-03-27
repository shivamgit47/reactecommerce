import { useState,React ,useContext} from 'react';
import { CartContext } from '../context/cart_context';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi'
import {CgMenu,CgClose} from 'react-icons/cg'
import { useCartContext } from '../context/cart_context';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '../styles/Button';


const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const{total_item}=useCartContext();
  const { loginWithRedirect,logout,isAuthenticated,user} = useAuth0();
  
    const Nav = styled.nav`
    .navbar
    {
      margin-right: 20px;
    }
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }
        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }
    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }
    .close-outline {
      display: none;
    }
    .cart-trolley--link {
      position: relative;
      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }
      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }
    .user-login--name {
      text-transform: capitalize;
    }
    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};
        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }
      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }
      .active .close-outline {
        display: inline-block;
      }
      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }
      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;
        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;
        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }
        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }
      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;
  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
      <ul className="navbar-lists">
        <li><NavLink 
                to="/"
                className="navbar-link home-link"
                onClick={()=> setMenuIcon(false)}>
                Home
            </NavLink>
        </li>
        <li><NavLink to="/About" className="navbar-link " onClick={()=> setMenuIcon(false)}>About</NavLink>
        </li>
        <li><NavLink to="/Products" className="navbar-link " onClick={()=> setMenuIcon(false)}>Products</NavLink>
        </li>
        <li><NavLink to="/Contact" className="navbar-link " onClick={()=> setMenuIcon(false)}>Contact</NavLink>
        </li>

        {isAuthenticated && <p>{user.name}</p>}

      {/* {isAuthenticated ? (//if authenticated and logged in will show logout button if not show log in button */}
        <li>
        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out
        </Button>
        </li>
      {/* ):( */}
        <li>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </li>
      {/* )} */}
        <li>
          <NavLink to="/Cart" className="navbar-link  cart-trolley--link" onClick={()=> setMenuIcon(false)}>
          <FiShoppingCart className="cart-trolley"/>
            <span className='cart-total--item '>{total_item}</span>
          </NavLink>
        </li>
      </ul>
      {/* btn for opening and closing menu */}
      <div className="mobile-navbar-btn">
        <CgMenu name="menu-outline" className="mobile-nav-icon"
        onClick={()=>setMenuIcon(true)}></CgMenu>
        <CgClose name="close-outline" className="mobile-nav-icon close-outline" onClick={()=> setMenuIcon(false)}></CgClose>
      </div>
      </div>
    </Nav>
    
  )
}


export default Nav
