export const getPosts = posts => ({
	type: "GET_POSTS",
	payload: { posts }
});

export const addFavorite = element => ({
	type: "ADD_FAVORITE",
	payload: { element }
});

export const removeFavorite = id => ({
	type: "REMOVE_FAVORITE",
	payload: id
});
