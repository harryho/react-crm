export type PostImage = {
  url: string;
  altText?: string;
  sortOrder: number;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  images: PostImage[];
  totalViews: number;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  postedAt: string | number | null;
  author: {
    name: string;
    avatarUrl: string;
  };
};
