//import libraries
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
function Homepage() {

    const classes = useStyles();

    return (
        <div style={{ width: '100vw', height: '100vw`, maxWidth: 100%', margin: '0', overflow: 'hidden' }}>
            <div className={classes.header}>
                <a href="/">
                    <img src="./pics/logo_full.png" alt="logo pic" height={140} />
                </a>
            </div>


            <div className={classes.middle}>
                <ul className={classes.blocks}>
                    <Button variant="contained" className={classes.button} href={window.location.href + "login"}>
                        Get Start
                    </Button>
                </ul>
            </div>

            <div className={classes.background}></div>
        </div>
    )

};

export default Homepage;