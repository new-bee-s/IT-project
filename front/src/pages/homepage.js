//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Layout} from 'antd';

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
        marginTop: "10vh",
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
        height: '100%',
        backgroundImage: 'url("/../pics/snowmountain.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        resizeMethod: 'cover',
        position: 'absolute',
        bottom: '0',
    },

}));


//  return homepage
function Homepage() {

    const classes = useStyles();
    const {Content} = Layout;

    return (
        <Layout className={classes.background} style={{ padding: '2vh 2vh', paddingRight: '2vh' }}>
        <Content>
            <div align="center">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <img src='./pics/logo_full.png' alt='logo pic' height={100}/>
            <br/>
            <br/>
            <img src='./pics/personalCRM.png' alt='crm pic' height={25}/>
            <br/>
            <br/>
            
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/><br/><br/><br/><br/>
                <a href={window.location.href + 'login'}>
                    <img src='./pics/getstart.png' alt='getstart pic' height={40}/>
                </a>
                <br/>
                <br/>
                <a href={window.location.href + 'register'}>
                    <img src='./pics/joinus.png' alt='joinus pic' height={35}/>
                </a>
            </div>
        </Content>
    </Layout>
    )

};

export default Homepage;