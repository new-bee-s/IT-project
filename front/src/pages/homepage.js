//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Layout} from 'antd';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    const {Content} = Layout;
    //className={classes.background} 
    return (
            // <div style={{width: '100%',height: '100%', backgroundImage: 'url("/../pics/background13.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', right: '0vw', top:'0vh'}}>
            // <div align="center">
            // <br/>
            // <br/>
            // <br/>
            // <br/>
            // <img src='./pics/logo_full.png' alt='logo pic' height={100}/>
            // <br/>
            // <br/>
            // <br/>
            // <br/>
            // <br/>
            // <br/>                
            // <br/>
            // <br/>
            // <br/>
            // <br/>
            // <br/>
            // <br/><br/><br/><br/><br/><br/>
            //     <a href={window.location.href + 'login'}>
            //     <Button variant="contained" className={classes.button}>
            //                             Get Start
            //     </Button>
            //     </a>
                
            //     <br/>

            //     <br/>
            //     <a href={window.location.href + 'register'}>
            //     <Button variant="contained" className={classes.button}>
            //                          Join Us
            //     </Button>
            //     </a>
            // </div>
            // </div>
        <div>
        <div style={{width: '50%',height: '100%', backgroundImage: 'url("/../pics/background24.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', left: '0vw', top:'0vh'}}></div>
        <div style={{width: '50%',height: '100%', backgroundColor: '#fffbf0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'absolute', right: '0vw', top:'0vh'}}>
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
            <Typography component="h1" variant="h5" align='center'>Connect you and all </Typography>
            <Typography component="h1" variant="h5" align='center'>your clients easily</Typography>

            <br/><br/><br/><br/><br/><br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <a href={window.location.href + 'login'}>    
            <Button variant="contained" className={classes.button}>
                                Get Start    
            </Button>
            </a>
            <br/>

            <br/>
            <a href={window.location.href + 'register'}>
            <Button variant="contained" className={classes.button}> 
                          Join Us
            </Button>
            </a>
            </div>

        </div>
        </div>
    )

};

export default Homepage;