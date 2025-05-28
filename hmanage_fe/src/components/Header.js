import * as React from 'react'
export default function Header(props){
    return (
        <header className='header'>
            <img src={props.logoSrc} className='header__img' alt="logo"/>
            <p className='header__p'>{props.pageTitle}</p>
        </header>
    )
}