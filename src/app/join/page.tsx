'use client';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState, FormEvent } from 'react';
import Image from 'next/image';

export default function Join(){
    const router = useRouter();
    const [code, setCode] = useState('');

    const goBack = (e : MouseEvent<HTMLButtonElement>): void=>{
        e.preventDefault();
        router.back();
    }

    const handleJoin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (code.trim()) {
            router.push(`/room/${code}`);
        }
    }
    
    return (
        <>
            <div className="container">
                <h1 className="page-hero">Meteion</h1>

                <div className="panel panel-default panel-auth">
                    <div className="panel-heading">
                        <h3 className="panel-title">Join</h3>
                    </div>

                    <div className="panel-body">
                        <form onSubmit={handleJoin}>

                            <div className="form-group">
                                <label className="code">Enter Code</label>
                                <input type="text" className="form-control" id="code" placeholder="ex: blah blah" 
                                onChange={(e) => setCode(e.target.value)}></input>
                            </div>

                            <div className="text-center btn-group">
                                <button className="btn btn-primary btn-lg btn-lg-wide">Join</button>
                                <button className="btn btn-default btn-lg btn-lg-wide" onClick={goBack}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Image src="/peek.png" className="img-rounded peek.png" alt="Cinque Terre" width="304" height="236"/>
            </div>
            <div>
                <Image src="/dawg.png" className="img-rounded dawg-img" alt="Cinque Terre" width="304" height="236"/>
            </div>
            <div>
                <Image src="/gym.png" className="img-rounded gym-img" alt="Cinque Terre" width="304" height="236"/>
            </div>
        </>
    );
}