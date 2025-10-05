'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import DrawCanvas from '@/components/drawingPad';
import './style.css'
import { getMessage, getMessages } from '@/dtos/room.dtos';

export default function Room() {
    const params = useParams<{ roomid: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [messages, setMessages] = useState<Array<{role: string, text: string, time: string}>>([]);
    const [currentMessage, setCurrentMessage] = useState('Messages will appear here');
    const [wordArray, setWordArray] = useState<string[]>([]);
    const lastMessageRef = useRef<getMessage | null>(null);

    useEffect(() => {
        async function validateRoom() {
            try {
                const response = await fetch(`/api/rooms/${params.roomid}`);
                
                if (!response.ok) {
                    setError('Room not found');
                    setTimeout(() => router.push('/'), 3000);
                } else {
                    addLog('SUCCESS', `Connected to room ${params.roomid}`);
                }
            } catch (err) {
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        }

        validateRoom();
    }, [params.roomid, router]);

    useEffect(()=>{
        const messages = async () =>{
            try{
                const response = await fetch(`/api/rooms/${params.roomid}`);
                if (response.ok) {
                    const data : getMessages = await response.json();

                    const newMessage : getMessage | undefined = data.messages.at(-1);

                    if (newMessage != undefined && (newMessage.user != lastMessageRef.current?.user || newMessage.text != lastMessageRef.current?.text)) {
                        lastMessageRef.current = newMessage;
                        addLog(newMessage.user, newMessage.text);
                    }
                }
            }catch (err) {
                console.error('Failed to get messages:', err);
            }
        }

        messages();

        const intervalID = setInterval(messages, 5000);

        return ()=> clearInterval(intervalID);
    }, [params.roomid]);

    const addLog = (role: string, text: string) => {
        const time = new Date().toLocaleTimeString();
        setMessages(prev => [...prev, { role, text, time }]);
    };

    const handleDrawingSuccess = (recognizedWord: string) => {
        setCurrentMessage(recognizedWord);
        setWordArray(prev => [...prev, recognizedWord]);
    };

    const handleMessageClick = (text: string) => {
        setCurrentMessage(text);
    };

    const onSubmit = async()=>{
        if(wordArray.length != 0){
            try{
                const response = await fetch('/api/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        room: params.roomid,
                        arr: wordArray,
                        lang: 'english',
                        user: 'wostin'
                    }),
                });
                if (response.ok) {
                    setWordArray([]); // Clear the array after successful submission
                } else {
                    addLog('ERROR', 'Failed to submit words');
                }
            } catch (err) {
                addLog('ERROR', 'Network error: Failed to send request');
            }
        }
    }

    if (loading) return <div className="container"><div style={{padding: '20px', textAlign: 'center'}}>Validating room...</div></div>;
    if (error) return <div className="container"><div style={{padding: '20px', textAlign: 'center', color: '#dc2626'}}>Error: {error}</div></div>;

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Room: {params.roomid}</h1>
            </header>

            <div className="pageContainer">
                {/* LEFT COLUMN */}
                <div className="leftCol">
                    <div className="codeSection">
                        <p>Words collected: {wordArray.join(', ') || 'None yet'}</p>
                    </div>

                    {/* CANVAS AREA */}
                    <div className="canvasArea">
                        <DrawCanvas onSuccess={handleDrawingSuccess} onError={addLog} onSubmit={()=>{onSubmit()}}/>
                    </div>

                    <div className="bottomRow">
                        <div>
                            <Link href="/" className="nextLink">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - MESSAGES */}
                <aside className="messagesSidebar">
                    <div className="messagesHeader">
                        <div className="messagesTitle">Messages</div>
                    </div>

                    {/* Message Display Area */}
                    <div className="messageDisplay">
                        {messages.length === 0 ? (
                            <div className="emptyState">
                                No messages yet. Start drawing to see recognition results.
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div 
                                    key={i}
                                    className="messageEntry"
                                    onClick={() => handleMessageClick(msg.text)}
                                >
                                    <div className={`messageRole ${
                                        msg.role === 'ERROR' ? 'roleError' : 
                                        msg.role === 'SUCCESS' ? 'roleSuccess' : 'roleInfo'
                                    }`}>
                                        {msg.role}
                                    </div>
                                    <div className="messageText">
                                        {msg.text}
                                    </div>
                                    <div className="messageTime">
                                        {msg.time}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
