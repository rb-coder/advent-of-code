import itertools
import re

distances = {}
locations = []
with open("input.txt") as inputFile:
    for line in inputFile.readlines():
    	data = re.match( r'(.+) to (.+) = (.+)', line)
    	if data:
    		distances[(data.group(1), data.group(2))] = int(data.group(3))
    		distances[(data.group(2), data.group(1))] = int(data.group(3))
    		locations.append(data.group(1))
    		locations.append(data.group(2)) 
locations = set(locations)

minDistance = None
maxDistance = None
for permutation in itertools.permutations(locations):
	distance = 0
	for index in range(len(permutation) - 1):
		distance += distances[(permutation[index], permutation[index + 1])]
	
	if not minDistance or distance < minDistance:
		minDistance = distance
		minRoute = permutation

	if not maxDistance or distance > maxDistance:
		maxDistance = distance
		maxRoute = permutation

print 'Shortest route (' + str(minDistance) + ') is ' + '->'.join(minRoute)
print 'Longes route (' + str(maxDistance) + ') is ' + '->'.join(maxRoute)
