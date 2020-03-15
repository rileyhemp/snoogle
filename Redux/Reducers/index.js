import { combineReducers } from "redux";

export default combineReducers({
	postIDs,
	setLoading
});

function postIDs(state = {}, action) {
	if (action.type === "GET_POSTS") {
		const searchResults = action.payload.posts;
		const filteredResults = [];
		const postIDs = [];
		for (let i = 0; i < searchResults.length; i++) {
			if (searchResults[i].pagemap) {
				const description = searchResults[i].pagemap.metatags[0]["og:description"];
				searchResults[i].totalComments = description.split("and ")[1].split(" comments")[0];
				filteredResults.push(searchResults[i]);
			}
		}
		filteredResults.forEach(el => {
			const ID = el.link.split("comments/")[1].split("/")[0]; //Split url before id
			postIDs.push("t3_" + ID); //Add t3_, Reddit's submission identifier.
		});
		return {
			...state,
			postIDs: postIDs
		};
	} else return state;
}

function setLoading(state = false, action) {
	if (action.type === "SET_LOADING") {
		const isLoading = action.payload;
		return {
			...state,
			isLoading: isLoading
		};
	} else return state;
}
