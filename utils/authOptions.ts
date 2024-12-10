import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';
import { JWT } from "next-auth/jwt";

const SPOTIFY_REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const basicAuth = Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64');

  const refreshToken = token.refreshToken as string; 

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  try {
    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID || '',
      clientSecret: process.env.SPOTIFY_SECRET || '',
      authorization: 
      'https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read,playlist-read-private,playlist-modify-private,playlist-modify-public',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        }
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error || 'No error.'
      session.user = token.user
      return session
    },
  },
}
