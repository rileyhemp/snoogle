const posts = (state = {}, action) => {
	if (action.type === "GET_POSTS") {
		console.log(action, action.payload);
		return {
			...state,
			...action.payload.posts
		};
	} else return state;
};

export default posts;
