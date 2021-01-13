const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const Jimp = require("jimp");

function convert() {
	console.log('converting...');

	Jimp.read("original.jpg", function (err, image) {
		if (err) {
			console.log(err)
		} else {
			image.write("original.png")
		}
	})

	Jimp.read("insta.jpg", function (err, image) {
		if (err) {
			console.log(err)
		} else {
			image.resize(2208, 2208)
			.write("insta.png")
		}
	})

	console.log('converted.');
}

function diff() {
	console.log('doing diff...');

	const img1 = PNG.sync.read(fs.readFileSync('original.png'));
	const img2 = PNG.sync.read(fs.readFileSync('insta.png'));

	const {width, height} = img1;
	const diff = new PNG({width, height});

	pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

	fs.writeFileSync('diff.png', PNG.sync.write(diff));

	console.log('diff done.');
}

convert();
diff();