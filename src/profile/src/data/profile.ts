export interface SocialLink {
  label: string;
  url: string;
  image: string;
}

export const PROFILE_DATA = {
  name: "Alan Ryan",
  slogan: "Exploring the boundaries between cultures",
  avatarUrl: "/persona/alan-ryan.jpg",
  links: [
    {
      label: "Rate Your Music",
      url: "https://rateyourmusic.com/~0nF1REy",
      image: "/isotypes/rym.png",
    },
    {
      label: "My Anime List",
      url: "https://myanimelist.net/profile/0nF1REy",
      image: "/isotypes/mal.png",
    },
    {
      label: "Letterboxd",
      url: "https://letterboxd.com/0nF1REy",
      image: "/isotypes/letterboxd.png",
    },
  ] as SocialLink[],
};
