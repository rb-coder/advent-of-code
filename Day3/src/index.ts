import fs = require('fs');

var calculateDelivered = function(input: string, delivererCount: number):void {
    fs.readFile(input, function(err: NodeJS.ErrnoException, data: Buffer) {
        var houses: number[][] = [[0,0]];
        var lastDeliveredHouses:number[][] = [];
        for (var i:number = 0; i<delivererCount; i++) {
            lastDeliveredHouses[i] = houses[0];
        }

        data.toString()
			.split('')
            .map(function(value: string): number[] {
				switch(value) {
					case '^': return [0, 1];
					case '>': return [1, 0];
					case 'v': return [0, -1];
					case '<': return [-1, 0];
				}
			})
            .forEach(function(move: number[], index: number): void {
                var lastDeliveredHouse = lastDeliveredHouses[index % delivererCount];
                var currentHouse: number[] = [lastDeliveredHouse[0] + move[0], lastDeliveredHouse[1] + move[1]];
                if (houses.filter(function(house: number[]): boolean{
                        return house[0] == currentHouse[0] && house[1] == currentHouse[1];
                    }).length == 0) {
                    houses.push(currentHouse);
                }
                lastDeliveredHouses[index % delivererCount] = currentHouse;
            });

        console.log('%d houses get at least one present with %d deliverer(s)', houses.length, delivererCount);
    })
};

calculateDelivered('./input.txt', 1);
calculateDelivered('./input.txt', 2);
