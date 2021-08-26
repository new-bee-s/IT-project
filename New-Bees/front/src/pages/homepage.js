import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    
    header:{
        background: '#0000FF',
        position: '50%',
        size: 'cover',
        overflow: 'hidden',
        width: '100%',
        display: 'block',
        boxSizing: "border-box",  
    },
    blocks:{
        height:'auto', 
        flexWrap:'wrap',
        justifyContent: 'center',
        paddingLeft: 'unset',
        paddingTop:'12vh',
        verticalAlign:'middle',
        borderRadius: 3,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:'center',
      },
    title:{
        width: '100%', 
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
        fontSize: 'calc(20px + 2vmin)',
        color:'E9DDC3',
        fontWeight:'bold',
    },
    background:{
        height:'89vh',
        position:'absolute',
        backgroundImage:`url("https://unsplash.com/photos/pfpNGWxFd74")`,
        backgroundPositionX:'center',
        backgroundPositionY:'bottom',
        backgroundSize:'cover',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign:'middle',
        width:'100%'
    },
    button:{
        background: '#0000FF',
        borderRadius: '3',
        border: 0,
        color: '#DEB887',
        fontFamily:'Patrick Hand',
    }

}));



function Homepage(){
   
    const classes = useStyles();
    console.log('jaosn');

    return(
        <div style={{background: '#E9DDC3'}}>
            <header className={classes.header}>
                <h3 className={classes.title} style={{color: "#E9DDC3", fontFamily:'courier'}}>
                  Welcome To New-Bees
                </h3>
            </header>
        

            <div className={classes.background}>
                <ul className={classes.blocks}>
                    <Button variant="contained" className={classes.button} >
                    Get Start
                    </Button> 
                </ul>

            </div>

         </div>
    )

};

export default Homepage;