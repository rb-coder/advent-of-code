object PasswordFinder {
	def generateNext(current: String): String = {
		var next = increment(current.toCharArray)
		while (!isValid(next)) {
			next = increment(next)
		}
		next.mkString
	}

	def isValid(password: Array[Char]): Boolean = {
		containsIncreasingStreightOf3(password) && !containsForbiddenLetters(password) && contains2DifferentPairsOfLetters(password)
	}

	def containsIncreasingStreightOf3(password: Array[Char]): Boolean = {
		var straight = 0;
		var last = password(0)
		var index = 1;
		while(straight < 2 && index < password.length) {
			if (password(index) == last + 1) {
				straight = straight + 1
			} else {
				straight = 0
			}
			last = password(index)
			index = index + 1
		}
		straight == 2
	}

	def containsForbiddenLetters(password: Array[Char]): Boolean = {
		(password contains 'l') || (password contains 'i') || (password contains 'o')
	}

	def contains2DifferentPairsOfLetters(password: Array[Char]): Boolean = {
		var pairs: Set[Char] = Set()
		var last = password(0)
		var index = 1;
		while(pairs.size < 2 && index < password.length) {
			if (password(index) == last && !(pairs contains last)) {
				pairs += last
			}
			last = password(index)
			index = index + 1
		}
		pairs.size == 2
	}

	def increment(word: Array[Char]): Array[Char] = {
		var toIncrement = word.length - 1
		var incremented = false
		while(!incremented && toIncrement >= 0) {
			var letter = word(toIncrement)
			if (letter == 'z') {
				word(toIncrement) = 'a'
				incremented = false
				toIncrement = toIncrement - 1
			} else {
				word(toIncrement) = (letter + 1).toChar
				incremented = true
			}
		}
		return word
	}


	def main(args: Array[String]): Unit = {
		var current = args(0)
		var next = generateNext(current)
		println(s"Next password after $current is $next")

		current = next
		next = generateNext(current)
		println(s"Next password after $current is $next")
	}
}