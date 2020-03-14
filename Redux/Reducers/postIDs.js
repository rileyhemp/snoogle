const postIDs = (state = {}, action) => {
	if (action.type === "GET_POST_IDS") {
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
};

export default postIDs;

// sortByComments(posts) {
// 	//Uses google's meta description to sort posts by number of replies

// 	const postsWithReplies = [];

// 	//Get the number of comments from the meta description and filters out posts with zero comments.
// 	//Description looks like this: '125 points and 26 comments'

// 	//Sort by comments high to low
// 	postsWithReplies.sort((a, b) => b.totalComments - a.totalComments);

// 	//Get the post IDs from the URL, push to an array, and send to handler.
// 	const postIDs = [];

// 	postsWithReplies.forEach(el => {
// 		const ID = el.link.split("comments/")[1].split("/")[0]; //Split url before id
// 		postIDs.push("t3_" + ID); //Add t3_, Reddit's submission identifier.
// 	});

// 	this.props.onSortedPosts(postIDs);
// }
