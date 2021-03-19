import React from 'react'

import './nav-item-goo.styles.scss'

function NavItemGoo(props){
    console.log(props)
    return(

        <div className='NavItemGoo'>
            <a href={props.href}>{props.icon}</a>
        </div>
    )
}

export default NavItemGoo;