#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int calculateGrade(float *numberOfLetters, float *numberOfSentences);
int count_letters(string text);
int count_sentences(string text);
int count_words(string text);

int main(void)

{
    string userInput = get_string("Text: \n");
    int letters = count_letters(userInput);
    int sentences = count_sentences(userInput);
    int totalWords = count_words(userInput);
    // printf("Number of Letters %i, number of sentences: %i\n number of Words: %i \n", letters, sentences, totalWords);

    float avgLetters = (float) letters / totalWords * 100;
    float avgSentences = (float) sentences / totalWords * 100;

    // printf("AVG LETTERS: %.2f \n", avgLetters);
    // printf("AVG Sentences: %.2f \n", avgSentences);
    int grade = calculateGrade(&avgLetters, &avgSentences);

    if (grade > 16)
    {
        printf("Grade 16+\n");
    }
    else if (grade < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", grade);
    }
}

int count_sentences(string text)
{
    int sentence_count = 0;
    for (int i = 0; text[i] != '\0'; i++)
    {
        if ((text[i] == '.' || text[i] == '!' || text[i] == '?') && isalpha(text[i - 1]))
        {
            sentence_count += 1;
        }
    }
    return sentence_count;
}

int count_letters(string text)
{
    int letter_count = 0;
    for (int i = 0; text[i] != '\0'; i++)
    {
        if (isalpha(text[i]))
        {
            letter_count += 1;
        }
    }
    return letter_count;
}
int count_words(string text)
{
    int wordCount = 0;
    for (int i = 0; text[i] != '\0'; i++)
    {
        if ((text[i] == ' ' || (text[i] == '.' || text[i] == '!' || text[i] == '?')) &&
            (isalpha(text[i - 1]) || text[i - 1] == ',' || text[i - 1] == '"'))
        {
            wordCount += 1;
        }
    }
    return wordCount;
}
int calculateGrade(float *numberOfLetters, float *numberOfSentences)
{
    float index = 0.0588 * *numberOfLetters - 0.296 * *numberOfSentences - 15.8;
    float roundedIndex = roundf(index);
    return (int) roundedIndex;
}