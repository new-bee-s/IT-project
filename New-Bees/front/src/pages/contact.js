import React from 'react'
import {useState,useEffect } from 'react'
import axios from '../commons/axios.js'
import ContactList from '../components/contactList.js'


export default function Contact(){
   
    const [acceptContact, setAcceptContacts] = useState([]);
    const [pendingContact, setPendingContact] = useState([]);

    useEffect(()=>{
        axios.get('/dashboard/'+'6140b212aefd2651a71281a5'+'/contact').then(response=>{
            console.log(response.data)
            if(response.data.success){
                setAcceptContacts(response.data.accepted)
                setPendingContact(response.data.pending)
            }
        }).catch(error=>{
            console.log(error.response)
        })
    },[]);

    return(
        <div>
            <div>
                <ContactList contacts={acceptContact}/>
            </div>

            <div>
                <ContactList contacts={pendingContact}/>
            </div>
        </div>
    )
    
}