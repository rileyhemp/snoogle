export const getPosts = posts => ({
	type: "GET_POSTS",
	payload: { posts }
});

export const addFavorite = element => ({
	type: "ADD_FAVORITE",
	payload: { element }
});
