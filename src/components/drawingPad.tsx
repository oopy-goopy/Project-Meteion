'use client';

import "./style.css";
import { useRef, useEffect, useState } from "react";
import { recognizeDrawing } from "@/function/gemini";

interface DrawCanvasProps {
    onSuccess: (word: string) => void;
    onError: (role: string, message: string) => void;
    onSubmit: ()=>void;
}

export default function DrawCanvas({ onSuccess, onError , onSubmit}: DrawCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth * 0.492;
        canvas.height = window.innerHeight * 0.4;

        canvas.getContext('2d')!.fillStyle = 'white';
        canvas.getContext('2d')!.fillRect(0, 0, canvas!.width, canvas!.height);

        const handleResize = () => {
            if (canvas) {
                const imgData = canvas.toDataURL();
                canvas.width = window.innerWidth * 0.492;
                canvas.height = window.innerHeight * 0.4;
                
                const img = new Image();
                img.onload = () => {
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0);
                };
                img.src = imgData;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isProcessing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const rect = canvas?.getBoundingClientRect();

        ctx?.beginPath();
        ctx?.lineTo(e.clientX - rect!.left, e.clientY - rect!.top);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || isProcessing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const rect = canvas?.getBoundingClientRect();

        ctx?.lineTo(e.clientX - rect!.left, e.clientY - rect!.top);
        ctx!.strokeStyle = 'black';
        ctx!.lineWidth = 2;
        ctx?.stroke();
    };

    const stopDraw = () => {
        setIsDrawing(false);
    };

    const clearButton = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        ctx?.clearRect(0, 0, canvas!.width, canvas!.height);

        ctx!.fillStyle = 'white';
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

        ctx?.restore();
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const submitDrawing = async (): Promise<void> => {
        const canvas = canvasRef.current;
        if (!canvas || isProcessing) return;

        setIsProcessing(true);
        console.log(isProcessing);

        try {
            const dataUrl = canvas.toDataURL('image/png');
            const base64Data = dataUrl.split(',')[1];

            if (!base64Data) {
                throw new Error('Failed to convert canvas to image');
            }

            const response = await recognizeDrawing(base64Data);

            if (response.success && response.text) {
                onSuccess(response.text);
                clearButton();
            } else {
                onError('ERROR', response.error || 'Could not recognize the drawing');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onError('ERROR', errorMessage);
        }finally{
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="top-buttons">
                <div className="controls">
                    <div className="controlsTitle">Drawing Controls</div>
                        <div className="buttonGroup">
                            <button onClick={downloadImage} className="button">
                                Download
                            </button>
                            <button onClick={clearButton} className="button">
                                Clear
                            </button>
                            <button onClick={submitDrawing} className="button" disabled={isProcessing}>
                                Next
                            </button>
                        </div>

                    <small className="hint">Draw something and click Next to recognize it.</small>
                </div>
                <button 
                    style={{ 
                        marginLeft: 'auto'
                    }} 
                    className="button"
                    onClick={onSubmit}
                    disabled={isProcessing}
                >
                    Send
                </button>
            </div>

            <div className="canvasPlaceholder" style={{ 
                padding: 0, 
                border: '2px solid #e5e7eb',
                position: 'relative'
            }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                    style={{ display: 'block', cursor: 'crosshair' }}
                />
            </div>
        </>
    );
}
