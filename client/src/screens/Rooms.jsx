import React,{useState, useEffect, useCallback} from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player'
import peer from '../service/peer'

const RoomPage = () => {
    const socket=useSocket();
    
    const [remoteSocketId,setRemoteSocketId]=useState(null);
    const [myStream,setMyStream]=useState(null);
    const [remoteStream,setRemoteStream]=useState(null);


    const handleUserJoined=useCallback(({email,id})=>{
        console.log(`${email} joined the room with id ${id}`);
        setRemoteSocketId(id);
    })

    const handleIncomingCall=useCallback(async ({from,offer})=>{
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setRemoteSocketId(from);
        setMyStream(stream);
        console.log(`Incoming call from ${from} with offer ${offer}`);
        const ans=await peer.getAnswer(offer);
        socket.emit('call:accepted',{ans,to:from});
    },[])

    const handleCallAccepted=useCallback(async ({from,ans})=>{
        await peer.setLocalDescription(ans);
        console.log("Call Accepted")
        for(const track of myStream.getTracks()){
            peer.peer.addTrack(track,myStream);
        }

    },[myStream])


    useEffect(()=>{
        peer.peer.addEventListener('track',async ev=>{
            const remoteStream=ev.streams;
            setRemoteStream(remoteStream);
        })
    },[])

    useEffect(()=>{
        socket.on('user:joined',handleUserJoined);
        socket.on('incoming:call',handleIncomingCall);
        socket.on('call:accepted',handleCallAccepted);

        return ()=>{
            socket.off('user:joined',handleUserJoined);
            socket.off('incoming:call',handleIncomingCall);
            socket.off('call:accepted',handleCallAccepted);
        }
    },[socket,handleUserJoined,handleIncomingCall,handleCallAccepted])


    const handleCallUser=useCallback(async ()=>{
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});

        const offer=await peer.getOffer();
        socket.emit('user:call',{offer,to:remoteSocketId});

        setMyStream(stream);
    },[remoteSocketId,socket])

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