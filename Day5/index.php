<?php
function isWord($string) {
    return strlen($string) > 0;
}

function contains3VowelsOrMore($string) {
    $vowelCount = 0;
    $vowels = ["a", "e", "i", "o", "u"];
    foreach ($vowels as $vowel) {
        $vowelCount += substr_count($string, $vowel);
        if ($vowelCount >= 3) {
            return true;
        }
    }
    return false;
}

function containsDoubleLetters($string) {
    $letters = str_split($string);
    $letter = $letters[0];
    for ($i=1, $size=count($letters); $i<$size; $i++) {
        if ($letters[$i] == $letter) {
            return true;
        }
        $letter = $letters[$i];
    }
    return false;
}

function containsMoreThanOneDoublePair($string) {
    $letters = str_split($string);
    for ($i=0, $size=count($letters)-1; $i<$size; $i++) {
        $pair = $letters[$i].$letters[$i+1];
        if (substr_count($string, $pair, $i) > 1) {
            return true;
        }
    }
    return false;
}

function containsRepeatingLetterWithLetterBetween($string) {
    $letters = str_split($string);
    $letter = $letters[0];
    for ($i=1, $size=count($letters)-1; $i<$size; $i++) {
        if ($letters[$i + 1] == $letter) {
            return true;
        }
        $letter = $letters[$i];
    }
    return false;
}

function containsBadWords($string) {
    $badWords = ["ab", "cd", "pq", "xy"];
    foreach ($badWords as $badWord) {
        if (substr_count($string, $badWord) > 0) {
            return true;
        }
    }
    return false;
}

function isNiceStringV1($string) {
    return contains3VowelsOrMore($string)
            && containsDoubleLetters($string)
            && !containsBadWords($string);
}

function isNiceStringV2($string) {
    return containsMoreThanOneDoublePair($string)
            && containsRepeatingLetterWithLetterBetween($string);
}

function countNiceStrings($fileName) {
    $niceStrings = [0, 0];
    $input = fopen($fileName, "r") or die("Missing input!");
    do {
        $string = fgets($input);
        if (isWord($string)) {
            if (isNiceStringV1($string)) {
                $niceStrings[0]++;
            }
            if (isNiceStringV2($string)) {
                $niceStrings[1]++;
            }
        }
    } while($string != "");
    fclose($input);
    return $niceStrings;
}

isNiceStringV1("ugknbfddgicrmopn") or die("jchzalrnumimnmhp should be nice");
isNiceStringV1("aaa") or die("aaa should be nice");
!isNiceStringV1("jchzalrnumimnmhp") or die("jchzalrnumimnmhp should be naughty");
!isNiceStringV1("haegwjzuvuyypxyu") or die("haegwjzuvuyypxyu should be naughty");
!isNiceStringV1("dvszwmarrgswjxmb") or die("dvszwmarrgswjxmb should be naughty");

isNiceStringV2("qjhvhtzxzqqjkmpb") or die("qjhvhtzxzqqjkmpb should be nice");
isNiceStringV2("xxyxx") or die("xxyxx should be nice");
!isNiceStringV2("uurcxstgmygtbstg") or die("uurcxstgmygtbstg should be naughty");
!isNiceStringV2("ieodomkazucvgmuy") or die("ieodomkazucvgmuy should be naughty");

$niceStrings = countNiceStrings("./input.txt");
print("Found ${niceStrings[0]} nice strings with first ruleset and ${niceStrings[1]} with the second\n");
?>
