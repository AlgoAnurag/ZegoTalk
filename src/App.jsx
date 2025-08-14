import './index.css'

import { useEffect, useRef, useState } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function App() {
const zpRef = useRef(null)
const userID = "user" + Math.floor(Math.random()*1000); 
const userName = "react_" + userID;
const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET;


const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,null, userID, userName);
useEffect(()=>{ 
const zp = ZegoUIKitPrebuilt.create(TOKEN);
zpRef.current =zp
zp.addPlugins({ ZIM });

},[TOKEN])

function invite(callType) {
   const targetUser = {
        userID:prompt("Enter callee's userID"),
        userName:prompt("Enter Callee's userName")
    };
   zpRef.current.sendCallInvitation({
    callees: [targetUser],
    callType,
    timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
   }).then((res) => {
    console.warn(res);
   })
   .catch((err) => {
   console.warn(err);
   });
}

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#438dcd] to-black flex items-center justify-center'>
      <div className='w-[500px] h-[400px] bg-[#263242] border-2  border-[#373535] flex flex-col items-center justify-center gap-[20px] '>
        <h2 className='text-[white] text-[20px]'><span className='text-blue-400'>UserName :</span>{userName}</h2>
        <h2 className='text-[white] text-[20px]'><span  className='text-blue-400'>UserID : </span>{userID}</h2>

        <button className='w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl cursor-pointer' onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>  Voice Call</button>
        <button className='w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl cursor-pointer' onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>  Video Call</button>
      </div>
    </div>
    
  )
}

export default App
