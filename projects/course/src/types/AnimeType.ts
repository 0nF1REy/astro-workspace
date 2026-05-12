export type Anime = {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
};

export type AnimeRes = {
  data: Anime[];
};
