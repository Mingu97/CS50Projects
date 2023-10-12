#include "helpers.h"
#include <stdio.h>
#include <stdlib.h>
void colorize(int height, int width, RGBTRIPLE image[height][width])
{
    // Change all black pixels to a color of your choosing
    printf("Height: %i", height);
    printf("\n Width: %i \n", width);
    int arraypos[height + 1][width + 1];
    int *imgAlloc = malloc(sizeof(image[height][width]) / sizeof(image[0][0]));
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            printf("Blue in Current height & width: %i\n", image[row][col].rgbtBlue);
            printf("Red in Current height & width: %i\n", image[row][col].rgbtRed);
            printf("Green in Current height & width: %i\n", image[row][col].rgbtGreen);

            if (image[row][col].rgbtGreen == 255 && image[row][col].rgbtBlue == 255 && image[row][col].rgbtRed == 255)
            {
                image[row][col].rgbtRed = 0;
                image[row][col].rgbtGreen = 0;
                image[row][col].rgbtBlue = 255;
            }
        }
    }
}
