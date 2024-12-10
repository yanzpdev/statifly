import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

const TOP_ARTISTS_URL = 'https://api.spotify.com/v1/me/top/artists';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: 'No access token' }), { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('time_range') || 'short_term';
  const limit = searchParams.get('limit') || 5;

  try {
    const response = await fetch(`${TOP_ARTISTS_URL}?time_range=${timeRange}&limit=${limit}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top artists');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } 
  catch (error) {
    console.error('Error fetching top artists:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
  }
}
