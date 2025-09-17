
export type Country = {
  id: string;
  name: string;
  owner: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO String
};

export type Update = {
  id: string;
  title: string;
  content: string;
  countryId: string;
  createdAt: string; // ISO String
  year: number;
  comments: Comment[];
  needsMapUpdate?: boolean;
  coverImage?: string;
};
