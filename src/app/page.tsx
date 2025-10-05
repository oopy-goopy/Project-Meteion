'use client';
import './style.css'

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const create = ()=>{
    router.push('/create');
  }
  const join = ()=>{
    router.push('/join');
  }

  return(
    <div className="bodySet">
      <p className="bigText">Meteion</p>
      <div className="button-col">
        <button>Create</button>
        <button>Join</button>
      </div>
    </div>
  );
}
