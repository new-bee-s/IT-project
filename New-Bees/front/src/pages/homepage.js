import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        boxSizing: "border-box",
        position: 'center',
        marginTop: '100vh'
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
    background: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        paddingTop: "20vh"
    },
    button: {
        width: "200px",
        height: "50px",
        background: '#429CEF',
        borderRadius: '100px',
        border: 0,
        color: '#FFFFFF',
        fontFamily: 'Ubuntu',
        fontSize: "18px"
    }

}));



function Homepage() {

    const classes = useStyles();
    console.log('jaosn');

    return (
        <div>
            <header className={classes.header}>
                <img src="./pics/logo_full.png" alt="" height={150} />
            </header>


            <div className={classes.background}>
                <ul className={classes.blocks}>
                    <Button variant="contained" className={classes.button} href={window.location.href + "login"}>
                        Get Start
                    </Button>
                </ul>

            </div>

        </div>
    )

};

export default Homepage;