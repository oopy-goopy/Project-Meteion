'use client';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function Join(){
    const router = useRouter();

    const goBack = (e : MouseEvent<HTMLButtonElement>): void=>{
        e.preventDefault();
        router.back();
    }
    
    return (
        <div className="container">
            <h1 className="page-hero">Meteion</h1>

            <div className="panel panel-default panel-auth">
                <div className="panel-heading">
                    <h3 className="panel-title">Join</h3>
                </div>

                <div className="panel-body">
                    <form>

                        <div className="form-group">
                            <label className="code">Enter Code</label>
                            <input type="text" className="form-control" id="code" placeholder="ex: blah blah"/>
                        </div>

                        <div className="text-center btn-group">
                            <button className="btn btn-primary btn-lg btn-lg-wide">Join</button>
                            <button className="btn btn-default btn-lg btn-lg-wide" onClick={goBack}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}