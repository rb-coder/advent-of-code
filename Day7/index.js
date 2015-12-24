var fs = require('fs');

var instructionWith2Inputs = function(match) {
	return createOutput([match[1], match[3]], match[2], match[4]);
};

var instructionWith1Input = function(match) {
	return createOutput([match[2]], match[1], match[3]);
};

var equalityInstruction = function(match) {
	return createOutput([match[1]], 'EQUAL', match[2]);
};

var createOutput = function(inputs, operationName, output) {
    var output = {
        inputs: inputs,
        inputValues: null,
        operation: getOperation(operationName),
        operationName: operationName,
        output: output,
        outputValue: null,
        updateInputs: function(state) {
            this.inputs.forEach(function(input, index) {
                if(this.inputValues[index] === undefined) {
                    if(state[input].outputValue !== undefined) {
                        this.inputValues[index] = state[input].outputValue;
                    }
                }
            }, this);
            return this;
        },
        canBeDetermined: function () {
            return this.inputValues.filter(function (value) {
                return value === undefined;
            }).length === 0;
        },
        calculate: function() {
            this.outputValue = this.operation.apply(null, this.inputValues);
            return this;
        },
        reset: function() {
            this.outputValue = undefined;
            this.inputValues = this.inputs.map(function(input) {
                if (isStatic(input)) {
                    return parseInt(input, 10);
                }
                return undefined;
            });
            return this;
        }
    };

    return output.reset.call(output);
};

var getOperation = function(operator) {
    switch (operator) {
		case 'AND': return and;
		case 'OR': return or;
		case 'RSHIFT': return rshift;
		case 'LSHIFT': return lshift;
        case 'NOT': return not;
        case 'EQUAL': return equal;
		default: throw 'unknown operator: ' + operator;
	}
}

var PATTERNS = [
	{pattern:/(\w+) (\w+) (\w+) \-> (\w+)/, resolver: instructionWith2Inputs},
	{pattern:/(\w+) (\w+) \-> (\w+)/, resolver: instructionWith1Input},
	{pattern:/(\w+) \-> (\w+)/, resolver: equalityInstruction},
];

var isStatic = function(input) {
	return typeof input == 'string' && input.match(/\d+/);
};

var isDetermined = function(state, input) {
    return typeof state[input] === 'number';
};

var and = function(firstInput, secondInput) {
    return firstInput & secondInput;
};
var or = function(firstInput, secondInput) {
	return firstInput | secondInput;
};
var rshift = function(firstInput, secondInput) {
	return firstInput >> secondInput;
};
var lshift = function(firstInput, secondInput) {
	return firstInput << secondInput;
};
var not = function(input) {
	return ~input;
};
var equal = function(input) {
	return input;
};

var update = function(state) {
    for(var output in state) {
        if (isUndetermined(state[output])) {
            state[output] = state[output].updateInputs.call(state[output], state);
            if (state[output].canBeDetermined.call(state[output])) {
                state[output] = state[output].calculate.call(state[output]);
            }
        }
    }
    return state;
};

var reset = function(state) {
    for(var output in state) {
        state[output] = state[output].reset.call(state[output]);
    }
    return state;
}

var isUndetermined = function(output) {
    return output.outputValue === undefined;
}

var isSimulationComplete = function(state) {
    for(var output in state) {
        if (isUndetermined(state[output])) {
            return false;
        }
    }
    return true;
};

var determine = function (state) {
    while (!isSimulationComplete(state)) {
        state = update(state);
    }
    return state;
};

var createInitialState = function (data) {
    return data.split('\n')
        .filter(function(instruction) {
            return instruction.length > 0;
        })
        .map(function(instruction) {
            for (matcher of PATTERNS) {
                var match = instruction.match(matcher.pattern);
                if (match) {
                    return matcher.resolver(match);
                }
            }
            throw 'Unknown instruction: ' + instruction
        }).reduce(function(accumulator, outputObject) {
            accumulator[outputObject.output] = outputObject;
            return accumulator;
        }, {});
};

var process = function(error, data) {
	if (error) {
		throw error;
	}

	var state = createInitialState(data);

    determine(state);
    console.log('The signal comming into wire a is', state['a'].outputValue);

    console.log('Now apply this as input to b and reset everything');
    state['b'].inputs = [ state['a'].outputValue.toString() ];
    state = reset(state);

    determine(state);
    console.log('The new signal comming into wire a is', state['a'].outputValue);
};

var main = function(input) {
	fs.readFile(input, 'utf8', process);
};

main('input.txt');
