import React,{useState, useEffect, useCallback} from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player'

const RoomPage = () => {
    const socket=useSocket();

    const [remoteSocketId,setRemoteSocketId]=useState(null);
    const [myStream,setMyStream]=useState(null);


    const handleUserJoined=useCallback(({email,id})=>{
        console.log(`${email} joined the room with id ${id}`);
        setRemoteSocketId(id);
    })

    useEffect(()=>{
        socket.on('user:joined',handleUserJoined);


        return ()=>{
            socket.off('user:joined',handleUserJoined);
        }
    },[socket,handleUserJoined])


    const handleCallUser=useCallback(async ()=>{
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setMyStream(stream);
    })

  return (
    <div>
        <h1>Room Page</h1>
        <h4>{remoteSocketId? "Connected" : "No one in the Room"}</h4>
        {remoteSocketId && <button onClick={handleCallUser}>Start Video Call</button>}
        {myStream && (
        <>  
            <h2>My Stream</h2>
            <ReactPlayer playing muted height="300px" width="300px" url={myStream} playing/>
        </>
        )}
        
    </div>
  )
}

export default RoomPage