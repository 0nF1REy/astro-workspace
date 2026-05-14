export type Anime = {
  mal_id: number;
  title: string;
  synopsis?: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
  type?: string;
  status?: string;
  aired?: {
    from: string | null;
    to: string | null;
    prop?: {
      from?: { day: number; month: number; year: number };
      to?: { day: number; month: number; year: number };
    };
  };
  genres?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios?: Array<{
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }>;
  producers?: Array<{
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }>;
  source?: string;
  rating?: string;
  duration?: string;
  rank?: number;
  popularity?: number;
  year?: number;
  season?: string;
  airing?: boolean;
};

export type AnimeRes = {
  data: Anime[];
};
