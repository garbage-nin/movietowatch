export interface Movie {
  id?: number;
  title: string;
  actors: string[];
  genre: string[];
  rating: number;
  views: number;
  pinned: boolean;
  watched: boolean;
  releaseDate: string;
  imageFile: string;
}
