interface ExternalUrls {
  spotify: string;
}

interface ExternalIds {
  isrc: string;
}

interface Followers {
  href: string | null;
  total: number;
}

interface Images {
  height: number;
  url: string;
  width: number;
}

interface FullArtistInfo {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

type ArtistInfo = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

type FullAlbumInfo = {
  album_type: string;
  artists: ArtistInfo[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Tracks {
  album: FullAlbumInfo
  artists: ArtistInfo[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TopArtistProps {
  href: string;
  items: FullArtistInfo[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
}

interface TopTracksProps {
  href: string;
  items: Tracks[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
}
  
export type TopItemsProps =
  | { items: TopArtistProps[] } // For top-artists
  | { items: TopTracksProps[] }; // For top-tracks