import React, { Component } from 'react';
import './Profile.css';
import 'typeface-roboto';
import Header from '../../common/header/Header'
import Avatar from '@material-ui/core/Avatar';
import profile_picture from '../../assets/profile_picture.jpg'

const base_url = "https://graph.instagram.com/me/media?fields=id,caption&access_token=";
const access_token = "IGQVJWZAC1KcmJDb3ZAuUHhZAOU1PNWVJakZA3RnhDQTVpazZAHVkFoQm9MV2FKQ3pDX3lTcE5UeXZAuYzgtc2NuTjdmYWptNjRPcTJKRmVWLVpBZAm51S3BwWUpxNGdaaTJkYncxUC16UEFWRlNKV3RaODdsaDB0WGNxWGVkZAnpR";

const styles = theme => ({

    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper

    },
    gridList: {
        width: 1100,
        height: 800,
    },

});


class Profile extends Component {

    constructor(){
        super();

        this.state = {
            modalIsOpen: false,
            allImagesData: [],
            imageClicked: false,
            user_name :null
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
                that.setState({ allImagesData: imageData ,
                user_name: item["username"]});
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


    render() {
        const { classes } = this.props;
        return(
            <div>
                <Header />


                <div className="col-left">
                    {<Avatar >
                        <img src={profile_picture} alt={"logo"} />
                    </Avatar>}
                </div>

                <span><div className="row-one">{this.state.user_name}</div></span>
                <span><div className="row-two">
                    <div className="col-l">Posts : 1</div>
                    <div className="col-c">Follows : 2</div>
                    <div className="col-r">Followed By : 3</div>
                </div></span>

            </div>


             )
        }
}


export default Profile;