var readLine = require('readline');
var fs = require('fs');

var lineReader = readLine.createInterface({
  input: fs.createReadStream('./input.txt')
});

var updateSum = (obj, sum, filter) => {
	if (Object.prototype.toString.call( obj ) === '[object Array]') {
		obj.forEach((item) => { sum = updateSum(item, sum, filter) });	
	} else if (Object.prototype.toString.call( obj ) === '[object Object]') {
		var filtered = false;
		if (filter) {
			Object.keys(obj).forEach((key) => { 
				if (obj[key] === 'red') {
					filtered = true;
				}
			});				
		}

		if (!filtered) {
			Object.keys(obj).forEach((key) => { sum = updateSum(obj[key], sum, filter) });	
		}
	} else if (typeof obj === 'number') {
		sum = sum + obj;
	}
	return sum;
}

var sum = 0;
var filteredSum = 0;
lineReader.on('line', (line) => {
	var obj = JSON.parse(line);
	
	sum = updateSum(obj, sum, false);
	filteredSum = updateSum(obj, filteredSum, true);
});

lineReader.on('close', () => {
	console.log('Sum of all is %d', sum);
	console.log('Sum of all but red is %d', filteredSum);
});
