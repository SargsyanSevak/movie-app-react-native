export enum QueryKeysEnum {
	getPopularMovies = "getPopularMovies",
	topRated = "topRated",
	genres = "genres",
	moviedetails = "moviedetails"
}

export type QueryKeyType = keyof typeof QueryKeysEnum;
