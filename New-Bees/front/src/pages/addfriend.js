//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Divider } from 'antd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import Cookies from 'universal-cookie';
import { UserOutlined, SearchOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Skeleton, Switch, Card } from 'antd';
import { CheckOutlined, UserAddOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';



// homepage style 
const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        boxSizing: "border-box",
        position: 'center',
        marginTop: '15vh'
    },
    middle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        marginTop: "5vh",
        overflow: 'hidden'
    },
    blocks: {
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop: '9vh',
        verticalAlign: 'middle',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',

    },
    button: {
        width: "250px",
        height: "50px",
        background: '#429CEF',
        borderRadius: '100px',
        border: 0,
        color: '#FFFFFF',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    },
    background: {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '31%',
        backgroundImage: 'url("./pics/homepage_bottom.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',
    }

}));


//  return homepage
function Addfriend() {


    const classes = useStyles();
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
        />
      );

    const { Meta } = Card;
    
    const onSearch = value => console.log(value);
    const { Title, Paragraph, Text, Link } = Typography;



    return (
        <div style={{ width: '100vw', height: '100vw`, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            <div className={classes.header}>
                <a href="/">
                    <img src="./pics/logo_full.png" alt="logo pic" height={30} />
                </a>
            </div>
            <div className={classes.middle}>
                <div>
                    <Typography component="h1" variant="h6" align='center'>Search anyone you wish to work with!</Typography>
                    <br />
                <Search placeholder="Enter user id" onSearch={onSearch} enterButton style={{ width: 300 }} />
                <Divider />
                <Typography component="h1" variant="h6" align='center'> Opps... No user is found. </Typography>
                
                <Typography component="h1" variant="h6" align='center'> Try different user id! </Typography>
                <Divider />
                <Typography component="h1" variant="h6" align='left'>Sending a request to ... </Typography>
                <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                        <EllipsisOutlined key="ellipsis" />,
                        <EditOutlined key="edit" />,
                        <UserAddOutlined key="add" />
                    
                    ]}
                >
                <Meta
                    avatar={
                    <Avatar size={48} icon={<UserOutlined />} />
                    }
                    title="FirstName LastName"
                    description="This slogon is empty"
                />
                </Card>
                <br />
                <Divider />
                <Typography component="h1" variant="h6" align='left'>Someone wants to add you... </Typography>
                <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                        <EllipsisOutlined key="ellipsis" />,
                        <EditOutlined key="edit" />,
                        <CheckOutlined key="confirm" />,
                    
                    ]}
                >
                <Meta
                    avatar={
                    <Avatar size={48} icon={<UserOutlined />} />
                    }
                    title="FirstName LastName"
                    description="This slogon is empty"
                />
                </Card>
                
                
                </div>    
            </div>



            
        </div>


    )

};

export default Addfriend;