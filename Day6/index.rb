class Coordinates
    attr_accessor :x
    attr_accessor :y
    def initialize(x, y)
        @x = x.to_i();
        @y = y.to_i();
    end
end

class Operation 
    def initialize(operation)
        match = /(.+) (\d+),(\d+) through (\d+),(\d+)/.match(operation)
        @command = match[1];
        @from = Coordinates.new(match[2], match[3])
        @to = Coordinates.new(match[4], match[5])    
    end

    def applyTo(matrix)
        result = matrix
        for x in @from.x .. @to.x
            for y in @from.y .. @to.y
                result[x][y] = applyToLight(result[x][y])
            end
        end
        return result
    end

    def applyToLight
        throw "Implement me"
    end
end

class BinaryOperation < Operation
    def applyToLight(previous)
        case @command
        when "turn on" then 1
        when "turn off" then 0
        when "toggle" then (previous + 1) % 2
        end 
    end
end

class BrightnessOperation < Operation
    def applyToLight(previous)
        case @command
        when "turn on" then previous + 1
        when "turn off" then [previous - 1, 0].max
        when "toggle" then previous + 2
        end 
    end
end

class LightGrid 
    def initialize(size)
        @size = size
        @matrix = Array.new(size) { Array.new(size) { 0 } }
    end

    def draw
        for x in 0 ... @size
            row = ""
            for y in 0 ... @size
                row += @matrix[x][y]
            end
            puts row
        end
        puts 
    end

    def apply(command) 
        @matrix = createOperation(command).applyTo(@matrix)
    end

    def createOperation(command)
        throw "Implement me"
    end

    def getSum 
        sum = 0
        for x in 0 ... @size
            for y in 0 ... @size
                sum += @matrix[x][y]
            end
        end
        return sum
    end
end

class BinaryLightGrid < LightGrid
    def createOperation(command)
        return BinaryOperation.new(command)
    end
end

class BrightnessLightGrid < LightGrid
    def createOperation(command)
        return BrightnessOperation.new(command)
    end
end

class LightShow
    def initialize(file)
        @showDescription = file
        @lights1 = BinaryLightGrid.new(1000)
        @lights2 = BrightnessLightGrid.new(1000)
    end

    def run
        instructions = File.new(@showDescription, "r")
        while (line = instructions.gets())
            @lights1.apply(line)
            @lights2.apply(line)
        end
        instructions.close()
    
        puts("#{@lights1.getSum()} lights are on after the binary light show")
        puts("#{@lights2.getSum()} is the final brigtness after the brightness light show")
    end
end

begin
    LightShow.new("input.txt").run()
rescue => err
    puts("Exception: #{err.inspect()}")
end