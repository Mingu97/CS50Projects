#include <cs50.h>
#include <stdio.h>

int main(void)
{
    long lamasPopulation = 0;
    long startSize;
    long endSize;
    int numberOfYears = 0;

    // TODO: Prompt for start size
    do
    {
        startSize = get_long("Start Size: ");
        lamasPopulation = startSize;
    }
    while (startSize < 9);

    // TODO: Prompt for end size
    do
    {
        endSize = get_long("End Size: ");
    }
    while (endSize < startSize);

    // TODO: Calculate number of years until we reach threshold
    if(endSize != startSize){
    do
    {
        long lamasBorn = lamasPopulation / 3;
        long lamasDeath = lamasPopulation / 4;
        long calculateLamas = (lamasPopulation + lamasBorn) - lamasDeath;
        lamasPopulation = calculateLamas;
        numberOfYears = numberOfYears + 1;
    }
    while (lamasPopulation < endSize);
}
    // TODO: Print number of years
    printf("Years: %i", numberOfYears);
}
