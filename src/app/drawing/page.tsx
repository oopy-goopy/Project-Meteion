'use client';

import "./style.css"

import { useRef, useEffect, useState } from "react";
import { recognizeDrawing } from "@/function/gemini";

export default function DrawCanvas(){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');

    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvas.getContext('2d')!.fillStyle = 'white';
        canvas.getContext('2d')!.fillRect(0, 0, canvas!.width, canvas!.height);

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

        ctx!.fillStyle = 'white';
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

        ctx?.restore();
    }

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    const submitDrawing = async (): Promise<void> => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setResult('');
        downloadImage();

        try {
            const dataUrl = canvas.toDataURL('image/png');
            const base64Data = dataUrl.split(',')[1];

            if (!base64Data) {
                throw new Error('Failed to convert canvas to image');
            }

            const response = await recognizeDrawing(base64Data);

            if (response.success && response.text) {
                setResult(response.text);
                console.log(response.text);
                clearButton();
            } else {
                setResult(`Error: ${response.error || 'Could not recognize the drawing'}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setResult(`Error: ${errorMessage}`);
        }
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
            <button onClick={clearButton} className="indexed">Clear</button>
            <button onClick={submitDrawing} className="indexed">Submit</button>
        </>
    );
}