import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import './Home.css';
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
import Header from '../../common/header/Header'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from  '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import GridList from '@material-ui/core/GridList';

const base_url = "https://graph.instagram.com/me/media?fields=id,caption&access_token=";
const access_token = "IGQVJWZAC1KcmJDb3ZAuUHhZAOU1PNWVJakZA3RnhDQTVpazZAHVkFoQm9MV2FKQ3pDX3lTcE5UeXZAuYzgtc2NuTjdmYWptNjRPcTJKRmVWLVpBZAm51S3BwWUpxNGdaaTJkYncxUC16UEFWRlNKV3RaODdsaDB0WGNxWGVkZAnpR";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    image: {
        width: null,
        resizeMode: 'contain',
        height: 220
    },
    Card: {
        width: 200,
        margin: 'auto'
    }
}));

class Home extends Component {

    constructor(){
        super();
        this.state= {
            allImagesData: [],
            imageClicked: false,
            numLikes: 0
        };

    }



    getInstagramImages(imageid, imageData) {
        // Get upcoming images
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let tempImageData = JSON.parse(this.responseText);
                var item = { "id": tempImageData.id, "media_type": tempImageData.media_type, "media_url": tempImageData.media_url, "username": tempImageData.username, "timestamp": tempImageData.timestamp };
                imageData.push(item);
                that.setState({ allImagesData: imageData });
            }
        });
        xhr.open("GET", "https://graph.instagram.com/" + imageid + "?fields=id,media_type,media_url,username,timestamp&access_token=" + access_token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    componentWillMount() {
        // Get instagram images
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let imageData = [];
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                
                for(const image of Object.entries(JSON.parse(this.responseText).data)){
                    that.getInstagramImages(image[1].id, imageData);
                }
                that.setState({
                    allImagesData : imageData
                });
            }
        });

        xhr.open("GET", base_url + access_token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }


    likeHandler = () => {
        this.state.imageClicked === false ? this.setState({imageClicked: true, numLikes: 1}) : this.setState({imageClicked: false, numLikes: 0});
      
    }


    render() {
        const { classes } = this.props;
        return(
            <div>
              <Header />

              <div className="flex-container wrap">
              <GridList cols={3} cellHeight='auto' >
   
                    {this.state.allImagesData.map(image => (
                        <Card className={classes.Card} key={"image" + image.id}>
                            <CardHeader
                                avatar={
                                    <Avatar src={this.props.profile_picture}  className={classes.avatar} />
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={image.username}
                                subheader={image.timestamp}
                            />
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={image.media_url}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    {this.state.fixedCaption}
                                </Typography><br />
                                {this.state.imageClicked === true ?
                                <span>
                                    <FavoriteIcon id={image.id} className="red" onClick={this.likeHandler} />
                                    <Typography>{this.state.numLikes} Likes</Typography>
                                </span> :
                                    <span>
                                    <FavoriteBorderRoundedIcon id={image.id} onClick={this.likeHandler} />
                                    <Typography>{this.state.numLikes} Likes</Typography>
                                </span>}<br />
                                <div className="comments">
                                    <Input placeholder="Add a comment" type="text" />
                                    <Button variant="contained" color="primary">ADD</Button>
                                    
                                </div>
                            </CardContent>
                        </Card>
                       
                    ))}

                    </GridList>
                </div>
            </div>            
             )
        }
}


export default withStyles(useStyles)(Home);