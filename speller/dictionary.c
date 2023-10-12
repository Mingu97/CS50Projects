// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 997;

// Hash table
node *table[N];
FILE *dict;
unsigned int wordCount = 0;

void wordtoLower(char *word)
{
    for (int i = 0; word[i]; word++)
    {
        word[i] = tolower(word[i]);
    }
}
int strncasecmp(const char *s1, const char *s2)
{
    while (*s1 && *s2)
    {
        int diff = tolower(*s1) - tolower(*s2);
        if (diff != 0)
            return diff;
        s1++;
        s2++;
    }
    return tolower(*s1) - tolower(*s2);
}
// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    char lowerWord[LENGTH + 1];
    strcpy(lowerWord, word);
    wordtoLower(lowerWord);

    int hashedWordNum = hash(word);
    node *pointer = table[hashedWordNum];

    int markedLength = strlen(word);
    while (pointer != NULL)
    {

        char *lowerNodeWord = pointer->word;
        int nodeLength = strlen(lowerNodeWord);

        if (markedLength == nodeLength)
        {
            if (strncasecmp(lowerNodeWord, lowerWord) == 0)
            {
                return true; // Found word in dictionary
            }
        }
        pointer = pointer->next;
    }

    return false; // word not found
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    int prime = 5;
    unsigned int hash_value = 0;

    // Initialize a variable to keep track of the string length
    int stringLength = 0;

    // Calculate the initial length, hash_value
    for (int i = 0; word[i] != '\0'; i++)
    {
        stringLength++;
        if (stringLength < prime)
        {
            hash_value = (hash_value * prime + tolower(word[i])) % N;
        }
        else
        {
            hash_value = (hash_value * prime + tolower(word[i])) % N;
        }
    }

    return hash_value;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO
    dict = fopen(dictionary, "r");
    if (dict == NULL)
    {
        printf("Could not open dictionary");
        return false;
    }

    char nextWord[LENGTH + 1];
    while (fscanf(dict, "%s", nextWord) != EOF)
    {
        // Allocate memory for a new node
        node *wordNode = malloc(sizeof(node));
        if (wordNode == NULL)
        {
            fclose(dict);
            return false;
        }

        // Initialize the new node
        wordNode->next = NULL;
        strcpy(wordNode->word, nextWord);

        // Calculate hash value and insert into hash table
        unsigned int hash_value = hash(nextWord);
        wordNode->next = table[hash_value];
        table[hash_value] = wordNode;
        wordCount++;
    }

    // Close the dictionary file
    fclose(dict);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    return wordCount;
}
// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i];
        while (cursor != NULL)
        {
            node *temp = cursor;
            cursor = cursor->next;
            free(temp); // Free the memory for the current node
        }
        table[i] = NULL; // Reset the table bucket to NULL after freeing all nodes
    }
    if (dict != NULL)
    {
        dict = NULL;
    }

    return true;
}
