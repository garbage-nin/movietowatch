export interface Movie {
  _id?: string;
  title: string;
  actors: string;
  genre: string[];
  rating: number;
  views: number;
  pinned: boolean;
  watched: boolean;
  watchedDate: string;
  releaseDate: string;
  imageFilename?: string;
}
