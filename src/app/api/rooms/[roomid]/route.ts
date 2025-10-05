import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomid: string }> }
) {
  try {
    const { roomid } = await params;

    // Forward the request to your external API
    const response = await fetch(`https://proj-meteion.oopygoopy.tech/api/rooms/${roomid}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json(
      { error: 'Failed to connect to server' },
      { status: 500 }
    );
  }
}
