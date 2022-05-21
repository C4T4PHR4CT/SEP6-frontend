export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  tagline: string;
  runtime: string;
  revenue: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany
{
  id: number;
  name: string;
  origin_country: string;
}
