export interface Current {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: CurrentClass;
  daily?: Daily[];
}

export interface CurrentClass {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  wind_speed?: number;
  wind_deg?: number;
  weather?: Weather[];
}

export interface Weather {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
}

export interface Daily {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  temp?: Temp;
  feels_like?: FeelsLike;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: Weather[];
  clouds?: number;
  pop?: number;
  uvi?: number;
}

export interface FeelsLike {
  day?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

export interface Temp {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}
