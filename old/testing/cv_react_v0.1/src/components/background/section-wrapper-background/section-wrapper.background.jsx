import React from 'react'

import './section-wrapper.styles.scss'

function SectionWrapperBackground(props){
    return(
        <div className='SectionWrapperBackground'>
            {props.children}
        </div>
    );
}

export default SectionWrapperBackground;