export type PostType = {
  id: string;
  data: {
    title: string;
    description?: string;
    published: Date;
    color?: string;
    image?: string;
    tags?: string[];
    imageUrl?: string;
  };
  collection: string;
};
