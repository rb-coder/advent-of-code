#!/usr/bin/perl
use strict;
use warnings;

my $codeLength = 0;
my $memoryLength = 0;
my $encodedLenght = 0;

open my $file, "./input.txt" or die "Could not read input";
while(my $line = <$file>) {
	$line = substr $line, 0, -1;
	$codeLength += length $line;
	$memoryLength += length eval $line;
	$encodedLenght += 2 + length quotemeta $line;
}
close $file;

my $difference1 = $codeLength - $memoryLength;
print "Difference between code length and in memory length is $difference1\n";

my $difference2 = $encodedLenght - $codeLength;
print "Difference between encoded length and code length is $difference2\n";
