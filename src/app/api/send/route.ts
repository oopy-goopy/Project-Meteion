import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { room, arr, lang, user } = body;

    // Forward the request to your external API
    const response = await fetch('https://proj-meteion.oopygoopy.tech/api/describe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "room" : room , "arr" : arr, "lang" : lang, "user" : user}),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create room' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}