let posts = [
	{
		title: 'Post One',
		body: 'This is post one',
	},
	{
		title: 'Post Two',
		body: 'This is post two',
	},
];

let list = document.querySelector('.userList');

function getPosts() {
	setTimeout(() => {
		for (let post of posts) {
			let li = document.createElement('li');
			li.appendChild(document.createTextNode(post.title));
			list.appendChild(li);
		}
		// let output = '';
		// posts.forEach((post, index) => {
		// 	output += `<li>${post.title}</li>`;
		// });
		// document.body.innerHTML = output;
	}, 1000);
}
// USING PROMISE
// function createPost(post) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			posts.push(post);
// 		}, 1000);
// 		let error = false;
// 		if (!error) resolve(posts);
// 		else reject('Error: something went wrong');
// 	});
// }
// function deletePost() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			let len = posts.length;
// 			// console.log('------>', posts.length);
// 			posts.splice(len - 1, len);
// 			// console.log('posts after slice', posts);
// 			let error = posts.length;
// 			if (error) {
// 				resolve();
// 			} else reject('Error: All user posts deleted');
// 		}, 1000);
// 	});
// }

// createPost({
// 	title: 'Post Three',
// 	body: 'This is post three',
// }).then(getPosts);
// let timer = setInterval(() => {
// 	deletePost()
// 		.then(getPosts)
// 		.catch((err) => {
// 			console.log(err);
// 			window.clearInterval(timer);
// 		});
// }, 1000);
// setTimeout(() => {
// 	createPost({ title: 'Post Four', body: 'This is post four' })
// 		.then(getPosts)
// 		.then(() => {
// 			setTimeout(() => {
// 				deletePost().catch((err) => {
// 					console.log(err);
// 					window.clearInterval(timer);
// 				});
// 			}, 1000);
// 		});
// }, 5000);

//USING PROMISE ALL
// function updateLastUserActivityTime() {
// setTimeout(() => {
// return new Promise((resolve, reject) => {
// 	let error = false;
// 	let date = new Date();
// 	if (!error) resolve(date);
// 	else reject('error');
// });
// }, 1000);
// }
// let newPost = createPost({
// 	title: 'Post Four',
// 	body: 'This is post four',
// }).then(posts);
// function logPosts() {
// 	console.log('Updated posts list:', posts);
// }
// Promise.all([
// 	createPost({
// 		title: 'Post Three',
// 		body: 'This is post three',
// 	}),
// 	updateLastUserActivityTime(),
// ])
// 	.then((values) => {
// 		console.log(values);
// 	})
// 	.then(() => {
// 		setTimeout(() => {
// 			deletePost();
// 		}, 2000);
// 	})
// 	.then(logPosts);

//USING ASYNC AWAIT
let postsCD = async () => {
	function createPost(post) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				posts.push(post);
			}, 1000);
			let error = false;
			if (!error) resolve(posts);
			else reject('Error: something went wrong');
		});
	}

	function deletePost() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let len = posts.length;
				posts.splice(len - 1, len);
				let error = posts.length;
				if (error) {
					resolve();
				} else reject('Error: All user posts deleted');
			}, 1000);
		});
	}

	let postC = await createPost({
		title: 'Post three',
		body: 'This is post three',
	});
	let postD = await deletePost();
	return postC;
};
postsCD().then((posts) => console.log(posts));
