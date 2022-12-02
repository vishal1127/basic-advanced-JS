let posts = [
	{
		title: 'Post One',
		body: 'This is post one',
		createdAt: `${Math.floor(Date.now() / 1000)}`,
	},
	{
		title: 'Post Two',
		body: 'This is post two',
		createdAt: `${Math.floor(Date.now() / 1000)}`,
	},
];

let intervalId = 0;

function getPosts() {
	clearInterval(intervalId);
	intervalId = setInterval(() => {
		let output = '';
		for (let i = 0; i < posts.length; i++) {
			output += `<li>${posts[i].title} created ${Math.floor(
				Date.now() / 1000 - posts[i].createdAt
			)} seconds ago</li>`;
		}
		// posts.forEach((post, index) => {
		// 	output += `<li>${post.title} created ${Math.floor(
		// 		Date.now() / 1000 - post.createdAt
		// 	)} seconds ago</li>`;
		// });
		document.body.innerHTML = output;
	}, 1000);
}
getPosts();
// using callback
function createPost(post, callback) {
	setTimeout(() => {
		let newPost = { ...post, createdAt: Date.now() / 1000 };
		posts.push(newPost);
		callback();
	}, 1000);
}

createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);

function create4thPost(post, callback) {
	setTimeout(() => {
		let newPost = { ...post, createdAt: Date.now() / 1000 };
		posts.push(newPost);
		callback();
	}, 2000);
}

// create4thPost(
// 	createPost({ title: 'Post four', body: 'This is post four' }, getPosts)
// );
create4thPost({ title: 'Post Four', body: 'This is post four' }, getPosts);

//using promise
// function createPost(post) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			posts.push(post);
// 			let error = false;

// 			if (!error) resolve();
// 			else reject('Error: something went wrong');
// 		}, 1000);
// 	});
// }

// createPost({ title: 'Post Three', body: 'This is post three' })
// 	.then(getPosts)
// 	.catch((err) => console.log(err));

var timer = 0;
var count = 0;
function lastEditedInSecondsAgo() {
	count = 0;
	clearInterval(timer);
	timer = setInterval(() => {
		count++;
		console.log(`Last edited ${count} seconds ago`);
	}, 1000);
}
lastEditedInSecondsAgo();
