#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Points assigned to each letter of the alphabet
int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

void assignAlphabetArray(int size);
int alphabetArray[25];

int compute_score(string word);

int main(void)
{
    assignAlphabetArray(25);
    // Get input words from both players
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    // Score both words
    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    // TODO: Print the winner
    if (score1 > score2)
    {
        printf("Player 1 wins!\n");
    }
    else if (score2 > score1)
    {
        printf("Player 2 wins!\n");
    }
    else
    {
        printf("Tie\n");
    }
}

int compute_score(string word)
{
    int score = 0;
    int wordLength = strlen(word);

    // TODO: Compute and return score for string
    for (int i = 0; i < wordLength; i++)
    {

        for (int j = 0; j <= 25; j++)
        {
            if ((int) word[i] == (int) alphabetArray[j] || (int) word[i] == (int) alphabetArray[j] - 32)
            {
                score += POINTS[j];
            }
        }
    }

    printf("Score: %i\n", score);
    return score;
}

void assignAlphabetArray(int size)
{
    int alphabetPos = 0;
    int alphabet[size];
    for (int i = 'a'; i <= 'z'; i++)
    {
        alphabetArray[alphabetPos] = i;
        alphabetPos++;
    }
}
