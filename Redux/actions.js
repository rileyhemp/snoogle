export const getPosts = posts => ({
	type: "GET_POSTS",
	payload: { posts }
});

export const setLoading = bool => ({
	type: "SET_LOADING",
	payload: { bool }
});
