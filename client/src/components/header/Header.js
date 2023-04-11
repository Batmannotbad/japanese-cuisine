import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header-wrapper'>
        <div className='header-entry'>
            <div className='navigation'>
                <ul>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>SHOP</li>
                    <li>MENU</li>
                    <li>CONTACT US</li>
                </ul>
            </div>
            <div className='order-section'>
                <button>ORDER HERE</button>
            </div>
        </div>
        <div className='slider-banner'>
            <ul>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
                <li>DELICIOUS AND YUMMY FOODS FROM JAPAN</li>
            </ul>
        </div>
    </div>
  )
}
