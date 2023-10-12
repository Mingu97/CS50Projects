# TODO
userInput = input("Text: ")


def getletters(text):
    letters = 0
    for char in text:
        if char.isalpha():
            letters += 1
    return letters


#print("letters: " + str(getletters(userInput)))


def getwords(text):
    words = 0
    for char in range(1, len(text)):
        if (text[char] in [" ", "!", "?", "."]) and (
            text[char - 1] in ['"', ","] or text[char - 1].isalpha()
        ):
            words += 1
    return words


#print("words : " + str(getwords(userInput)))


def getsentences(text):
    sentences = 0
    for char in range(1, len(text)):
        if (text[char] == "." or text[char] == "!" or text[char] == "?") and text[
            char - 1
        ].isalpha():
            sentences += 1
    return sentences


#print("sentences: " + str(getsentences(userInput)))


def calcgrade(avgLetters, avgSentences):
    index = 0.0588 * avgLetters - 0.296 * avgSentences - 15.8
    return index


letters = getletters(userInput)
words = getwords(userInput)
sentences = getsentences(userInput)
avgLetters = round((letters / words) * 100, 2)
avgSentences = round((sentences / words) * 100, 2)
grade = round(calcgrade(avgLetters, avgSentences))

if (grade < 1):
    print("Before Grade 1")
elif(grade > 16):
    print("Grade 16+")
else:
    print("Grade: " + str(grade))

