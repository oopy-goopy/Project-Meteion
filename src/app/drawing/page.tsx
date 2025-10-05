'use client';
import "./style.css"

import { useRef, useEffect, useState } from "react";

export default function DrawCanvas(){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const rect = canvas?.getBoundingClientRect();

        ctx?.beginPath();
        ctx?.lineTo(e.clientX - rect!.left, e.clientY - rect!.top);
        setIsDrawing(true);
    }

    const draw = (e : React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const rect = canvas?.getBoundingClientRect();

        ctx?.lineTo(e.clientX - rect!.left, e.clientY - rect!.top);
        ctx!.strokeStyle = 'black';
        ctx!.lineWidth = 2;
        ctx?.stroke();
    }

    const stopDraw = ()=>{
        setIsDrawing(false);
    }

    const clearButton = ()=>{
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx?.restore();
    }

    return (
        <>
            <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            />
            <button onClick={clearButton} className="clearButton">Clear</button>
        </>
    );
}