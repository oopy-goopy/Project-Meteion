'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createRoom } from '@/dtos/room.dtos';
import { useState } from 'react';
import { useGlobalStore } from '@/function/global';

export default function Home() {
  const {_user, setUser} = useGlobalStore();

  const router = useRouter();
  const [userName, _setUser] = useState('');
  const changeFunc = (e: React.ChangeEvent<HTMLInputElement>)=>{
    _setUser(e.target.value);
  }
  const changeUsername = (u : string)=>{
    setUser(u);
  }

  const create = async ()=>{
    if(userName == '') return;
    changeUsername(userName);
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'ostin',
        }),
      });

      if (response.ok) {
        // Handle success - navigate or show success message
        const data : createRoom = await response.json()
        console.log('Room created:', data);
        router.push(`/room/${data.room}`);
      } else {
        // Handle error
        console.error('Error creating room:', response.json);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }
  const join = ()=>{
    if(userName == '') return;
    changeUsername(userName);
    router.push('/join');
  }

  return(
    <>
      <div className="jumbotron text-center">
        <div>
          <h1 
            className="animate__animated animate__fadeInDown" 
          >
            Project: Meteion
          </h1>
        </div>
        <Image src="/stormP1.png" className="img-rounded stormP1-img" alt="Cinque Terre" width="304" height="236"/>
        <Image src="/orang.png" className="img-rounded orang-img" alt="Cinque Terre" width="304" height="236"/>
        <Image src="/edwdg.png" className="img-rounded edwdg-img" alt="Cinque Terre" width="304" height="236"/>
      </div>

      <div className="form-group">
        <label>Enter Name: </label>
        <input type="text" id="nameControl" placeholder="ex: Alice" onChange={changeFunc}/>
      </div>
      <div className="button-row">
        <input type="submit" id="submitButton" name="CREATE LOBY" value="CREATE LOBBY" onClick={create}/>
        <input type="submit" id="submitButton" name="JOIN LOBY" value="JOIN LOBBY" onClick={join}/>
      </div>
    </>
  );
}
