import React, {useState} from 'react';

import NavSideTab from '../../components/navs/nav-side-tab/nav-side-tab.component.jsx'
import SectionWrapperBackground from './../../components/background/section-wrapper-background/section-wrapper.background.jsx'
import CubeBackground from './../../components/background/cube/cube.background.component' 

import './home.page.styles.scss';


import { HiCog,HiHome } from 'react-icons/hi'
import { ImPencil2 } from 'react-icons/im'

const HomePage = () => {
    let menuItems = [
        {
            'icon':  <HiHome/>,
            'text': 'Home',
            'href': '#0',
        },
        {
            'icon': <ImPencil2/>,
            'text': 'Projects',
            'href': '#0',
        },
        {
            'icon': <HiCog/>,
            'text': 'Skills',
            'href': '#0',
        }
    ]

    return(
        <>
        <NavSideTab menuItems={menuItems} ></NavSideTab>
        {/* <Navbar> */}
            {/* <NavItem icon={ <HiHome/>}> */}
                {/* <DropdownMenu></DropdownMenu> */}
            {/* </NavItem> */}
            {/* <NavItem icon={ <ImPencil2/>}></NavItem> */}
            {/* <NavItem icon={ <HiCog/>}></NavItem> */}
        {/* </Navbar> */}

      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          width: "99%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* <div
          style={{
            backgroundColor: "green",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            position: "absolute",
            zIndex: "-1"
          }}
        > */}
            <CubeBackground></CubeBackground>
        {/* </div> */}
        {/* <p>GSDGSDFGdsg adfg stdh aerg haerg aerg</p> */}
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          width: "99%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            backgroundColor: "blue",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            position: "absolute",
            zIndex: "-1"
          }}
        >
            <CubeBackground></CubeBackground>
        </div>
        <p>GSDGSDFGdsg adfg stdh aerg haerg aerg</p>
      </div>

      {/* <div
        style={{
          backgroundColor: "blue",
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* <CubeBackground></CubeBackground> */}

      {/* </div> */} 
        </>
    )
}


// function Navbar(props){
//     return(
//         <nav className="navbar">
//             <ul className="navbar-nav">{ props.children }</ul>
//         </nav>
//     );
// }

// function NavItem(props){

//     const [open, setOpen] = useState(false);

//     return(
//         <li className="nav-item">
//             <a href='#0' className="icon-button" onClick={() => setOpen(!open)}>
//                 {props.icon}
//             </a>
//             {open && props.children}
//         </li>
//     );
// }


// function DropdownMenu(){

//     function DropdownItem(props){
//         return(
//             <a href='#0' className="menu-item" >
//                 <span className="icon-button">{props.leftIcon}</span>
//                 {props.children}
//                 <span className="icon-button">{props.rightIcon}</span>
//             </a>
//         );
//     }

//     return(
//         <div className="Dropdown">
//             <DropdownItem>My Profile</DropdownItem>
//         </div>
//     )
// }

export default HomePage;