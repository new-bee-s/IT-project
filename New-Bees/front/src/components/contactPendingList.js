import React from 'react'
import ContactPendingBrief from './contactPendingBrief.js'


export default function ContactList(props) {
    const renderContact = props.contacts.map((contact,index)=>{
        
        return (
            
            <ContactPendingBrief
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