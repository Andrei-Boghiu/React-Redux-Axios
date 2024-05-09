import React from 'react'
// import { Link } from 'react-router-dom'
import './footer.css'
import brand from '../../brand.json'

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className='footer'>
            <p className='copyright'>Copyright &#169; {brand.title} {year}.</p>
        </div>
    )
}
