#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Declaring Variables needed
int plainTextLength;
int alphabetArray[26];
int cipherArray[100]; // Handles 100 Characters.

// Declaring Functions Needed
bool isValidKey(string key);
void printCipher(int arr[], int size);
void encodeText(string text, int arr[], string keyProvided);
void generateAlphabet(int arr[], int size);

int main(int argc, string argv[])
{
    // CLA Check
    if (argc != 2)
    {
        printf("Usage: ./substitution KEY\n");
        return 1;
    }

    // Key Check
    string key = argv[1];

    if (!isValidKey(key))
    {
        return 1;
    }

    // User Plain Text gathering
    string userPlainText = get_string("plaintext: ");
    plainTextLength = strlen(userPlainText);

    // Calling required functions to encipher text.
    generateAlphabet(alphabetArray, 26);
    encodeText(userPlainText, alphabetArray, key);
    printCipher(cipherArray, plainTextLength);
    printf("\n");
}

void generateAlphabet(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = i + 'a';
    }
}

bool isValidKey(string key)
{
    int keyLength = strlen(key);
    if (keyLength != 26)
    {
        printf("Key must contain 26 characters.");
        return false;
    }

    bool seen[26] = {false};
    for (int i = 0; i < keyLength; i++)
    {
        if (!isalpha(key[i]))
        {
            return false;
        }

        int index = tolower(key[i]) - 'a';
        if (seen[index])
        {
            return false;
        }
        seen[index] = true;
    }

    return true;
}

void encodeText(string text, int arr[], string keyProvided)
{
    // looping through text
    for (int i = 0; i < plainTextLength; i++)
    {
        if (isalpha(text[i]))
        {
            // checking for current character location in the array of the alphabet
            for (int j = 0; j < 26; j++)
            {
                if (tolower(text[i]) == arr[j])
                {
                    if (isupper(text[i]))
                    {
                        cipherArray[i] = toupper(keyProvided[j]);
                    }
                    else
                    {
                        cipherArray[i] = tolower(keyProvided[j]);
                    }
                    break; // Found the corresponding letter, break the loop
                }
            }
        }
        else
        {
            // Keep special characters as they are
            cipherArray[i] = text[i];
        }
    }
}

void printCipher(int arr[], int size)
{
    printf("ciphertext: ");
    for (int i = 0; i < size; i++)
    {
        if (arr[i] != 0)
        {
            printf("%c", arr[i]);
        }
    }
}
