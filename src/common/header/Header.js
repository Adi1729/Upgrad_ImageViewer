import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import logo from '../../assets/logo.svg';
import Avatar from '@material-ui/core/Avatar';
import profile_picture from '../../assets/profile_picture.jpg'
import {IconButton, Menu, MenuItem} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import {Link,Route, BrowserRouter as Router} from 'react-router-dom';
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'


class Header extends Component {
    constructor(){
        super();
        this.state = {
            openMenu : null,
            setOpenMenu : null

        }
    }

     menuHandler = () => {

        this.setState({
            setOpenMenu : true,
            openMenu : true
         });
    }


    closeMenu = () => {

        this.setState({
            setOpenMenu : false,
            openMenu : false
         });
    }



    render(){
        return (
            <div>
                <header className = "app-header">
                <div className = "title">Image Viewer
                  </div>

                    <div className="searchBox" >
                        <img src={logo} className="app-logo" alt="Search Logo" />
                        <FormControl className="formControl">
                          <Input className="searchText" type="text" placeholder="Search..." disableUnderline={true}
                                 />
                        </FormControl>
                    </div>
                   
                        <IconButton >
                            <Avatar className='app-pic' src={profile_picture} onClick={this.menuHandler} >
                            </Avatar>
                        </IconButton>
                        <Menu id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                            open={this.state.openMenu} onClose={this.closeMenu}  >
                            <MenuItem onClick={this.closeMenu}><Link to="/profile">Profile</Link></MenuItem>
                            <MenuItem onClick={this.closeMenu}><Link to="/">Logout</Link></MenuItem>
                        </Menu>
                </header>

            </div>
        )
    }

}


export default Header;