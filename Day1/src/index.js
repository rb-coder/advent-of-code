'use strict';

let Rx = require('rx');
let fs = require('fs');

(function() {
    let stream = Rx.Observable.fromNodeCallback(fs.readFile);
    let steps = stream('./input.txt')
        .map(buff => buff.toString())
        .flatMap(str => str.split(''))
        .map(step => step === '(' ? 1 : -1);

	steps
        .sum()
        .subscribe(result => console.log('Final floor', result));

	steps
	    .reduce((acc,step) => {
            if (acc.floor !== -1) {
                acc.floor += step;
                acc.step++;
            }
            return acc;
        }, {floor:0, step:0})
        .map((result) => result.step)
	    .subscribe(result => console.log('First time in basement @ step', result));
})();
