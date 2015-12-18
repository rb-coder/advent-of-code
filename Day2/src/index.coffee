fs = require 'fs'
lineReader = require 'readline'

getReader = (input) ->
    lineReader.createInterface {input: fs.createReadStream input}

getDimensionsFromLine = (line) ->
    line.split 'x'

requiredPaperForPresent = ([a, b, c]) ->
    ab = a * b
    bc = b * c
    ac = a * c
    paper = 2 * ab + 2 * bc + 2 * ac + Math.min ab, bc, ac

requiredRibbonForPresent = ([a, b, c]) ->
    [a, b, c] = [a, b, c].sort((a, b) -> a - b)
    ribbon = 2*a + 2*b + a*b*c

calculateRequiredMaterialsForAllPresents = (input) ->
    paper = 0
    ribbon = 0
    reader = getReader input
    reader.on 'line', (line) ->
        presentSize = getDimensionsFromLine line
        paper += requiredPaperForPresent presentSize
        ribbon += requiredRibbonForPresent presentSize

    reader.on 'close', ->
        console.log 'Required paper for all presents is', paper, 'square feet'
        console.log 'Required ribbon for all presents is', ribbon, 'feet'

calculateRequiredMaterialsForAllPresents './input.txt'
