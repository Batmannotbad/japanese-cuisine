import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer-wrapper'>
        <div className='footer-group'>
            <div className='footer-item'>
                <div className='footer-item-title'>
                    THE COMPANY
                </div>
                <ul>
                    <li>Specialties</li>
                    <li>Weekly Promos</li>
                    <li>Stay in the Loop</li>
                </ul>
            </div>
            <div className='footer-item'>
                <div className='footer-item-title'>
                    THE TEAM
                </div>
                <ul>
                    <li>Meet the Team</li>
                    <li>Collaborations</li>
                    <li>Our Specialty Chef</li>
                </ul>
            </div>
            <div className='footer-item'>
                <div className='footer-item-title'>
                    FROM JAPAN
                </div>
                <ul>
                    <li>The Cuisine</li>
                    <li>Authentic</li>
                    <li>Delicious and Healthy</li>
                </ul>
            </div>
            <div className='footer-item'>
                <div className='footer-item-title'>
                    LEGAL
                </div>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Privacy</li>
                    <li>Policy Copyright</li>
                </ul>
            </div>
        </div>
        <div className='footer-copyright'>
            Copyright 2021 Fashion with Ethics All Rights Reserved.
        </div>
    </div>
  )
}
