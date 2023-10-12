#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int n;
    do
    {
        n = get_int("Size: ");
    }
    while (n > 8 || n <= 0);

    for (int totalLoop = 1; totalLoop <= n; totalLoop++)
    {
        for (int i = n - totalLoop; i > 0; i--)
        {
            printf(" ");
        }
        for (int j = 0; j < totalLoop; j++)
        {
            printf("#");
        }
        for (int k = 0; k < 2; k++)
        {
            printf(" ");
        }
        for (int l = 0; l < totalLoop; l++)
        {
            printf("#");
        }
        printf("\n");
    }
}