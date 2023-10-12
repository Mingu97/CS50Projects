#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
} candidate;

// Array of candidates
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner();

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
    }

    int voter_count = get_int("Number of voters: ");

    // Loop over all voters
    for (int i = 0; i < voter_count; i++)
    {
        string name = get_string("Vote: ");

        // Check for invalid vote
        if (!vote(name))
        {
            printf("Invalid vote.\n");
        }
    }

    // Display winner of election
    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    int i = 0;
    while (i < candidate_count)
    {
        if (strcmp(name, candidates[i].name) == 0)
        {
            candidates[i].votes += 1;
            return true;
        }
        i++;
    }
    return false; // invalid candidate name
}

// Print the winner (or winners) of the election
void print_winner(void)
{

    // two candidates being compared
    int min_index;
    for (int i = 0; i < MAX - 1; i++)
    {
        min_index = i;
        for (int j = i + 1; j < MAX; j++)
        {
            if (candidates[min_index].votes > candidates[j].votes)
            {
                min_index = j;
            }
        }
        if (min_index != i)
        {
            candidate temp = candidates[i];
            candidates[i] = candidates[min_index];
            candidates[min_index] = temp;
        }
    }

    int highestVotes = candidates[MAX - 1].votes; // Get the highest number of votes
    for (int i = MAX - 1; i >= 0; i--)
    {
        if (candidates[i].votes == highestVotes)
        {
            printf("%s\n", candidates[i].name);
        }
        else
        {
            break; // Once votes start decreasing, stop checking
        }
    }
}