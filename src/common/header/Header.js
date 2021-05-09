import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import logo from '../../assets/logo.svg';
import Avatar from '@material-ui/core/Avatar';
import profile_picture from '../../assets/profile_picture.jpg'

class Header extends Component {
    constructor(){
        super();
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
                            onChange={this.props.searchChangeHandler} />
                        </FormControl>
                      </div>

                      <Avatar className = 'app-pic' src={profile_picture} />

                </header>

            </div>
        )
    }

}


export default Header;