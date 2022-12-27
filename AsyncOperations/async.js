console.log('Person 1 enters movie hall');
console.log('Person 2 enters movie hall');
//USING PROMISE
// function promiseWifeGettingTicket() {
// 	return new Promise((resolve, reject) => {
// 		resolve('Ticket');
// 	});
// }
// const getPopcorn = promiseWifeGettingTicket().then((t) => {
// 	return new Promise((resolve, reject) => {
// 		resolve(`${t},Popcorn`);
// 	});
// });
// const getButter = getPopcorn.then((i) => {
// 	return new Promise((resolve, reject) => {
// 		resolve(`${i}, butter`);
// 	});
// });
// const getColdDrinks = getButter.then((c) => {
// 	return new Promise((resolve, reject) => {
// 		resolve(`Person 3 enters after getting ${c} and cold drinks`);
// 	});
// });
// getColdDrinks.then((t) => {
// 	console.log(t);
// });

//USING ASYNC AWAIT
let enteringHall = async () => {
	let getTicket = new Promise((resolve, reject) => resolve('Ticket'));
	let getPopcorn = new Promise((resolve, reject) => resolve('Popcorn'));
	let getButter = new Promise((resolve, reject) => resolve('Butter'));
	let getColdDrinks = new Promise((resolve, reject) => resolve('Cold drinks'));

	// let ticket = await getTicket;
	// let popcorn = await getPopcorn;
	// let butter = await getButter;

	let ticket = await Promise.all([
		getTicket,
		getPopcorn,
		getButter,
		getColdDrinks,
	]);

	return ticket;
};

enteringHall().then((t) =>
	console.log(`Person 3 enters after getting the ${t}!`)
);

console.log('Person 4 enters movie hall');
console.log('Person 5 enters movie hall');
