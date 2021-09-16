import React from 'react'
import {useState,useEffect } from 'react'
import axios from '../commons/axios.js'
import contactList from './front/components/contactList.js'


export default function contacts( ){
    console.log('jason')
    const [acceptContact, setAcceptContacts] =useState([]);
    const [pendingContact, setPendingContact] =useState([]);

    console.log('jason')

    useEffect(()=>{

        axios.get('/dashboard/'+'6141ed2b8020ea6817a31774'+'/contact').then(response=>{
            console.log(response.data)
            if(response.data.success){
                setAcceptContacts(response.data.accepted)
                setPendingContact(response.data.pending) 
            }
        }).catch(error=>{
            console.log(error.response)
        })
    });

    return(
        <div>
            <div>
                <contactList contacts={acceptContact}/>
            </div>

            <div>
                <contactList contacts={pendingContact}/>
            </div>
        </div>
    )
    
}