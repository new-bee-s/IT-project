//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { Drawer} from 'antd';


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
        width: "140px",
        height: "40px",
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
        backgroundImage: 'url("/../pics/beach.jpeg")',
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
    const [about, setabout] = useState(false);
    const [support, setsupport] = useState(false);
    const [admin, setadmin] = useState(false);
    const [team, setteam] = useState(false);
    

    const showAbout = () => {
        setabout(true);
    };

    const showSupport = () => {
        setsupport(true);
    };

    const showAdmin = () => {
        setadmin(true);
    };

    const showTeam = () => {
        setteam(true);
    };

    const onClose = () => {
        setabout(false);
        setsupport(false);
        setadmin(false);
        setteam(false);
    };

    return (
        <div style={{width: '100%', height: '100%', backgroundImage: 'url("/../pics/keyboard.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', right: '0vw', top:'0vh'}}>
            {/* logo div */}
            <div style={{position: 'absolute', left: '3vw', top:'3vh' }}>
                <img src='./pics/logo_full.png' alt='logo pic' height={50}/>
            </div>

            {/* help divs */}
            <div style={{position: 'absolute', right: '37.5vw', top:'3.8vh' }}>
                <h2 onClick = {showAbout} style={{color: 'white', fontFamily: 'Ubuntu'}}> About </h2>      
            </div>
            
            <div style={{position: 'absolute', right: '32vw', top:'3.8vh' }}>
                <h2 onClick = {showSupport} style={{color: 'white', fontFamily: 'Ubuntu'}}> Support </h2>              
            </div>
            <div style={{position: 'absolute', right: '27vw', top:'3.8vh' }}>
                <h2 onClick = {showAdmin} style={{color: 'white', fontFamily: 'Ubuntu'}}> Admin </h2>              
            </div>
            <div style={{position: 'absolute', right: '23vw', top:'3.8vh' }}>
                <h2 onClick = {showTeam} style={{color: 'white', fontFamily: 'Ubuntu'}}> Team </h2>              
            </div>

            {/* continue div */}
            <div style={{position: 'absolute', right: '3vw', top:'3.5vh' }}>
                <a href={window.location.href + 'login'}>
                    <Button variant="contained" className={classes.button}>
                        Get Start
                    </Button>
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href={window.location.href + 'register'}>
                    <Button variant="contained" className={classes.button}>
                        Join Us
                    </Button>
                </a>
            </div>
            
            {/* slogon div */}
            <div align = 'center' style={{position: 'absolute', left: '35vw', top:'40vh' }}>
                <h1 style={{color: 'white', fontFamily: 'Ubuntu'}}> Connect with Old Client and Meet New Client  </h1>
                <h1 style={{color: 'white', fontFamily: 'Ubuntu'}}> All in New-Bee Personal CRM </h1>              
            </div>

            <Drawer
                title="About"
                placement={'left'}
                onClose={onClose}
                visible={about}
                key = {'d1'}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

            <Drawer
                title="Support"
                placement={'left'}
                onClose={onClose}
                visible={support}
                key = {'d2'}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

            <Drawer
                title="Admin"
                placement={'left'}
                onClose={onClose}
                visible={admin}
                key = {'d3'}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

            <Drawer
                title="Team"
                placement={'left'}
                onClose={onClose}
                visible={team}
                key = {'d4'}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>


        </div>
    )

};

export default Homepage;