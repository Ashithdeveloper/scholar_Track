import React from 'react'
import client from '../api/client';
import { useEffect } from 'react';

export default function Profilepage() {
   const token = localStorage.getItem("token");
   console.log("Token loaded:", token);

   const getMe = async()=>{
    try {
        const res = await client.apiGet("/api/user/getme");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
   } 
   useEffect(() => {
       getMe()
   },[token])
  return (
    <div>Profilepage</div>
  )
}
