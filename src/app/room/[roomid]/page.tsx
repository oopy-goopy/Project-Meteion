'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import './style.css'

export default function Room(){
    const params = useParams<{ roomid: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [messages, setMessages] = useState<Array<{role: string, text: string, time: string}>>([]);
    const [currentMessage, setCurrentMessage] = useState('Messages will appear here');

    useEffect(() => {
        async function validateRoom() {
        try {
            const response = await fetch(`http://localhost:3001/api/rooms/${params.roomid}`);
            
            if (!response.ok) {
            setError('Room not found');
            setTimeout(() => router.push('/'), 3000);
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
        }

        validateRoom();
    }, [params.roomid, router]);

    const addLog = (role: string, text: string) => {
        const time = new Date().toLocaleTimeString();
        setMessages(prev => [...prev, { role, text, time }]);
    };

    const copyLogs = async () => {
        const lines = messages.map(m => `[${m.time}] ${m.role}: ${m.text}`);
        const txt = lines.join('\n');
        
        try {
            await navigator.clipboard.writeText(txt);
            alert('Copied to clipboard!');
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = txt;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            alert('Copied to clipboard!');
        }
    };

    const handleMessageClick = (text: string) => {
        setCurrentMessage(text);
    };

    if (loading) return <div>Validating room...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Room: {params.roomid}</h1>
            </header>

            <div className="pageContainer">
                {/* LEFT COLUMN */}
                <div className="leftCol">
                    {/* CANVAS/DRAWING AREA */}
                    <div className="canvasArea">
                        <div className="controls">
                            <div className="controlsTitle">Controls</div>
                            
                            <div className="buttonGroup">
                                <button 
                                    className="button"
                                    onClick={() => addLog('INFO', 'Button clicked at ' + new Date().toLocaleTimeString())}
                                >
                                    Test Button
                                </button>
                                <button 
                                    className="button"
                                    onClick={() => addLog('SUCCESS', 'Action completed successfully')}
                                >
                                    Success Test
                                </button>
                                <button 
                                    className="button"
                                    onClick={() => addLog('ERROR', 'Something went wrong')}
                                >
                                    Error Test
                                </button>
                            </div>

                            <small className="hint">Click buttons to test message logging functionality.</small>
                        </div>

                        <div className="canvasPlaceholder">
                            <div className="placeholderContent">
                                <p className="placeholderTitle">Canvas Area</p>
                                <p className="placeholderText">Your drawing canvas component will go here</p>
                            </div>
                        </div>
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
                        <div className="headerButtons">
                            <button className="copyButton" onClick={copyLogs} title="Copy log">
                                Copy
                            </button>
                        </div>
                    </div>

                    {/* Message Display Area */}
                    <div className="messageDisplay">
                        {messages.length === 0 ? (
                            <div className="emptyState">
                                No messages yet. Click the test buttons to see messages appear here.
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

                    {/* Read-only message input area */}
                    <div className="readonlySection">
                        <div 
                            className="readonlyBox"
                            role="textbox"
                            aria-readonly="true"
                            tabIndex={0}
                            title="This is a read-only message box"
                        >
                            <div className={`readonlyText ${
                                currentMessage === 'Messages will appear here' ? 'readonlyTextEmpty' : 'readonlyTextFilled'
                            }`}>
                                {currentMessage}
                            </div>
                            <button 
                                className="clearButton"
                                onClick={() => setCurrentMessage('Messages will appear here')}
                                title="Clear current"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="readonlyHint">
                            Read-only — cannot type here
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );

}