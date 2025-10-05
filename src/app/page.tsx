'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createRoom } from '@/dtos/room.dtos';

export default function Home() {
  const router = useRouter();

  const create = async ()=>{
    try {
      const response = await fetch('http://localhost:3001/api/createRoom', {
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
    router.push('/join');
  }

  return(
    <div className='bodySet'>
      <div className="jumbotron text-center">
        <div>
            <h1 className="animate__animated animate__fadeInDown">Meteion</h1>
        </div>
        <Image src="/stormP1.png" className="img-rounded meteion-img" alt="Cinque Terre" width="304" height="236"/>
      </div>

      <div className='middleButton'>
        <button id="submitButton" onClick={create}>create</button>
        <button className="transferButton" onClick={join}>join</button>
      </div>
    </div>
  );
}
