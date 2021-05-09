import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import './Login.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText' ;
import 'typeface-roboto';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Header from '../../common/header/Header';
import Home from '../home/Home';

const customStyles ={
    content :{
        top : '50%',
        left : '50%',
        right : 'auto',
        bottom : 'auto',
        marginRight : '-50%',
        transform : 'translate(-50%,-50%)'

    }
}


class Login extends Component {
    constructor()
    {
        super();
        this.state = {
        modalIsOpen : false,
        value : 0,
        username : "",
        password : "",
        usernameRequired :"dispNone",
        passwordRequired :"dispNone",
        error : "dispNone"
    }

    }

    openModalHandler =() =>
    {
        this.setState({modalIsOpen: true})
    }

    closeModalHandler= () => 
    {
        this.setState({modalIsOpen: false});
        this.setState({usernameRequired : "dispNone"});
        this.setState({passwordRequired : "dispNone"})
    }

    loginClickHandler = () => {
        this.state.username ==="" ? this.setState({usernameRequired : "dispBlock"}) : this.setState({usernameRequired : "dispNone"});
        this.state.password ==="" ? this.setState({passwordRequired : "dispBlock"}) : this.setState({passwordRequired : "dispNone"});  
        let usernameCorrect = "Username";
        let passwordCorrect = "Password";
        let accessToken = "IGQVJXa2xuT29yVXMxN0gtMWdnakY4TVVvUnNGcHhObllBaXJwZA1hGTEFPazJCNk9aSmh4bWpkQXFrUkNYMFNlMVpaeWktY3Jwb1RvMXAzbThCMm5uVjNIRi1jai0zWDZAKYmhGWWtCRTJ0NF9sQkI2YnFOemxBNnp2ZAldF";
        console.log(this.state.username,this.state.password);

        if((this.state.username==usernameCorrect) && (this.state.password == passwordCorrect)) {
            sessionStorage.setItem('accessToken','IGQVJXa2xuT29yVXMxN0gtMWdnakY4TVVvUnNGcHhObllBaXJwZA1hGTEFPazJCNk9aSmh4bWpkQXFrUkNYMFNlMVpaeWktY3Jwb1RvMXAzbThCMm5uVjNIRi1jai0zWDZAKYmhGWWtCRTJ0NF9sQkI2YnFOemxBNnp2ZAldF')
            ReactDOM.render(
                <Home />,
               document.getElementById('root')
            )


        }

        else if ((this.state.username!="") && (this.state.password!="")) {
            this.state.error = "dispBlock"
        }

    }

    inputUserNameChangeHandler = (e) =>{
     
        this.setState({username : e.target.value});
        
    }

    inputPasswordChangeHandler = (e) =>{
    
        this.setState({password : e.target.value});
        
    }

    render() {
        return (
            <div>
               <Header />
                <Card className  = 'login-card' variant="outlined">
                    <CardContent>
                    <Typography  variant = "h5">
                           LOGIN
                     </Typography>
                        <FormControl required>
                            <InputLabel htmlFor="userName" > Username</InputLabel>
                            <Input id ="username" type ="text" username = {this.state.username}  onChange = {this.inputUserNameChangeHandler}/>
                            <FormHelperText className = {this.state.usernameRequired}><span className ="red">required</span></FormHelperText>
                        </FormControl> <br />
                        <FormControl required>
                            <InputLabel htmlFor="passWord" > Password</InputLabel>
                            <Input id ="password" type ="password" password = {this.state.password}  onChange = {this.inputPasswordChangeHandler} />
                            <FormHelperText className = {this.state.passwordRequired}><span className ="red">required</span></FormHelperText>
                        </FormControl> <br /> <br />
                        <Button variant ="contained" color ="primary" onClick = {this.loginClickHandler}> LOGIN
                            </Button>           
                        <FormHelperText className = {this.state.error}><span className ="red">Incorrect username and/or password</span></FormHelperText>
                    </CardContent>
                </Card>

            </div>
        )
    }
}

export default Login;