import React, { PureComponent } from "react";
import {Button} from "antd";
import axios from "axios";
const { Fragment } = React;
const saveStoreZeroCharge = "/feiyangshop-admin-react/saveStoreZeroCharge";

class Operation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            file:'',
            showImg:'none',
            token:'jianshu',
            name:'CoderZb',
            storeId:'91',
            subsidyAmount:'82',
            imagePreviewUrl:'',
        }
    }

    render() {
        var {imagePreviewUrl,showImg} = this.state;
        var imagePreview = null;
        if (imagePreviewUrl) {
        imagePreview = ( <label  for="avatarFor">< img style={{width:'80px',height:'80px'}} src={imagePreviewUrl} /></label>);
        showImg = 'none';
        } else {
        showImg = 'block';
        }

        return (
        <Fragment>
            <p style={{ margin: "0" }}>upload avatar</p>
                <input id="avatarFor" style={{display:'none'}} type="file" onChange={(e)=>this.handleImageChange(e)}/>
                {imagePreview}
                <label style={{color:"#1890FF",border:"1px dashed #1890FF",padding:'3px 10px ',display:showImg}} for="avatarFor">Click to select</label>
            
                <Button
                    key="submit"
                    type="primary"
                    onClick={this.chargeFunc}
                >
                    Submit{" "}
                </Button>
        </Fragment>
        );
    }

    
    handleImageChange(e) {
        e.preventDefault();
        
        var reader = new FileReader();
        var file = e.target.files[0];
        
        reader.onloadend = () => {
        console.log('file name: ',file);
        console.log('result: ',reader.result);
        this.setState({
        file: file,
        imagePreviewUrl: reader.result
        });
        }
        
        reader.readAsDataURL(file)
    }
    chargeFunc= (e) => { 
        console.log("file name: ",this.state.file);
        const formData = new FormData();
        console.log("one------");
        // formData.append('file',value);
        formData.append('filename', this.state.file)
        formData.append('token',this.state.token);
        formData.append('userName',this.state.name);
        formData.append('storeId',this.state.storeId);
        formData.append('chargeMoney',this.state.subsidyAmount);
        let config = {
            method: 'post',
            headers:{'Content-Type': 'multipart/form-data'}
        }
        axios.post(saveStoreZeroCharge,formData,config).then((res) => {
            if (res.data.msg === '用户登陆已过期') {
                alert("请重新登录");
                return false;
            }
            if (res.data.status === 200) {

                // this.getStoreInfo();
            }
            if (res.data.status !== 200) {

                return false;
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

export default Operation;