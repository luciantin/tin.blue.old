import React  from 'react'

import './nav-side-tab.styles.scss'

import { HiMenu } from 'react-icons/hi'
import  NavItemGoo  from '../nav-items/nav-item-goo/nav-item-goo.component.jsx'
import {ReactComponent as MenuLogo} from '../../../common/icons/menu.svg'


class NavSideTab extends React.Component {
    constructor(){
        super();
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.state ={
            open:true,
        }
    }

    mouseEnter = () => {
        // console.log('hi');
        this.setState({ open: false });
      }
      mouseLeave = () => {
        //   console.log('bye');
        this.setState({ open: true });
      }

    render(){
        // console.log(this.props.menuItems)
        // const isOpen = this.state.open;
        let menu;
        if(this.state.open) menu = <Tab color='#f0f' w='50px'  />;
        else menu = <Menu menuItems={this.props.menuItems} color='#0ff' w='150px' />;

        return(
            <div className='NavSideTabContainer' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                {menu}
            </div>
        )
    }

}


export default NavSideTab;


function Tab(props){
    return( 
        // <div >
            // {/* <HiMenu></HiMenu> */}
            <MenuLogo className="Tab" ></MenuLogo >
        // </div>
    )
}

function Menu(props){
    console.log(props.menuItems)
    return( 
        <div className="Menu">
            {props.menuItems.map((e,i)=> <NavItemGoo href={e['href']} icon={e['icon']} key={i}></NavItemGoo>)}
        </div>
    )
}