export interface SocialLink {
  label: string;
  url: string;
  image: string;
}

export const PROFILE_DATA = {
  name: "Alan Ryan",
  slogan: "Exploring the boundaries between cultures",
  avatarUrl: "/assets/images/persona/alan-ryan.jpg",
  links: [
    {
      label: "Rate Your Music",
      url: "https://rateyourmusic.com/~0nF1REy",
      image: "/assets/images/isotypes/rym-logo.svg",
    },
    {
      label: "My Anime List",
      url: "https://myanimelist.net/profile/0nF1REy",
      image: "/assets/images/isotypes/mal-logo.svg",
    },
    {
      label: "Letterboxd",
      url: "https://letterboxd.com/0nF1REy",
      image: "/assets/images/isotypes/letterboxd-logo.svg",
    },
  ] as SocialLink[],
};
