import csv
import sys


def main():
    argvLen = len(sys.argv)
    # TODO: Check for command-line usage
    if argvLen < 3:
        print("Please input filename")
    filename = sys.argv[1]
    textFile = sys.argv[2]

    # TODO: Read database file into a variable
    dbfile = readDatabase(filename)

    # TODO: Read DNA sequence file into a variable
    seqfile = readSequence(textFile)
    # TODO: Find longest match of each STR in DNA sequence
    sequence_profile = []

    for pattern in dbfile[0]:
        if pattern != "name":
            longest_run = longest_match(seqfile[0][0], pattern)
            sequence_profile.append(longest_run)

    # TODO: Check database for matching profiles
    for profile in dbfile:
        name = profile["name"]
        match = True
        cols_tocompare = [col for col in profile.keys() if col != "name"]
        for i, col in enumerate(cols_tocompare):
            if int(profile[col]) != sequence_profile[i]:
                match = False
                break
        if match:
            print(name)
            break
    if not match:
        print("No match")

    return


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):
        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:
            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


def readDatabase(filename):
    dnaDict = []
    try:
        with open(filename, "r") as dbfile:
            dbReader = csv.DictReader(dbfile)
            for row in dbReader:
                dnaDict.append(row)
        return dnaDict
    except FileNotFoundError:
        print("Database File not found")
        return False


def readSequence(textFile):
    seqDict = []
    try:
        with open(textFile, "r") as seqfile:
            seqreader = csv.reader(seqfile)
            for row in seqreader:
                seqDict.append(row)
        return seqDict
    except FileNotFoundError:
        print("DNA Sequence File not found")
        return False


main()
