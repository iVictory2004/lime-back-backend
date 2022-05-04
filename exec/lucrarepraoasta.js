//e cokopie la ring bikes dar gen pula  stii tu
const bikes = require("../data/last15bikesbackwards.json");
const ringBike = require("./ringBike");
const readline = require("readline");
const { sleep } = require("../exports");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function doThething() {
	rl.question(`Cate troti vrei sa suni boossu?\n`, (nr) => {
		const firstNBikes = bikes.slice(0, nr);
		for (let bike of firstNBikes) {
			const lat = bike.attributes.latitude;
			const lng = bike.attributes.longitude;
			ringBike(bike.id, lat, lng);
			console.log(`Am sunat ${bike.id}!!(adika nuj sigur)`);
			await(async () => {
				await sleep(3000);
			})();
		}
		rl.close();
	});
}

// console.log(bikes);
doThething();

// console.log(bikes)
