import React from 'react'
import ContactBrief from './contactAcceptBrief.js'

export default function ContactList(props) {
    console.log(props.contacts)
    const renderContact = props.contacts.map((contact,index)=>{
        
        return (
            
            <ContactBrief
                key ={index}
                contact = {contact}/> 
        )
    })   
    return (
        <div style={{paddingBottom:'60px', fontFamily:'Patrick Hand', 
                    minHeight:'calc(100vh - 64px - 4vmin - 5vw - 5vh)', width:'40vw', margin:'5vw'}}>
            {renderContact}
        </div>
    )
}