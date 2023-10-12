#include "helpers.h"
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            int red = image[row][col].rgbtRed;
            int green = image[row][col].rgbtGreen;
            int blue = image[row][col].rgbtBlue;
            float average = round((float) (red + green + blue)) / 3;

            // Set the new grayscale values for red, green, and blue components
            image[row][col].rgbtRed = round((float) average);
            image[row][col].rgbtGreen = round((float) average);
            image[row][col].rgbtBlue = round((float) average);
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int rowCounter = 0;
    int colCounter = 0;

    RGBTRIPLE tempImage[height][width];

    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            tempImage[row][col] = image[row][col];
        }
    }
    // Reflect the image horizontally
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width / 2; col++)
        {
            RGBTRIPLE tempPixel = tempImage[row][col]; // Copy pixel value
            tempImage[row][col] = tempImage[row][width - 1 - col];
            tempImage[row][width - 1 - col] = tempPixel;
        }
    }

    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            image[row][col] = tempImage[row][col];
        }
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Create a temporary image to store blurred pixels
    RGBTRIPLE tempImage[height][width];

    // Loop through each pixel in the image
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            int sumRed = 0;
            int sumGreen = 0;
            int sumBlue = 0;
            int count = 0;

            // Iterate through neighboring pixels (3x3 box)
            for (int i = -1; i <= 1; i++)
            {
                for (int j = -1; j <= 1; j++)
                {
                    int newRow = row + i;
                    int newCol = col + j;

                    // Check if neighboring pixel is within bounds
                    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width)
                    {
                        sumRed += image[newRow][newCol].rgbtRed;
                        sumGreen += image[newRow][newCol].rgbtGreen;
                        sumBlue += image[newRow][newCol].rgbtBlue;
                        count++;
                    }
                }
            }

            // Calculate average color values
            tempImage[row][col].rgbtRed = round((float) sumRed / count);
            tempImage[row][col].rgbtGreen = round((float) sumGreen / count);
            tempImage[row][col].rgbtBlue = round((float) sumBlue / count);
        }
    }

    // Copy blurred image back to the original image
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            image[row][col] = tempImage[row][col];
        }
    }
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // temp Image
    RGBTRIPLE tempImage[height][width];

    int Gx[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int Gy[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            int sumRedGx = 0, sumGreenGx = 0, sumBlueGx = 0;
            int sumRedGy = 0, sumGreenGy = 0, sumBlueGy = 0;

            // Sobel Kerner to calculate Gx and Gy
            for (int i = -1; i <= 1; i++)
            {
                for (int j = -1; j <= 1; j++)
                {
                    int newRow = row + i;
                    int newCol = col + j;
                    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width)
                    {
                        sumRedGx += image[newRow][newCol].rgbtRed * Gx[i + 1][j + 1];
                        sumGreenGx += image[newRow][newCol].rgbtGreen * Gx[i + 1][j + 1];
                        sumBlueGx += image[newRow][newCol].rgbtBlue * Gx[i + 1][j + 1];

                        sumRedGy += image[newRow][newCol].rgbtRed * Gy[i + 1][j + 1];
                        sumGreenGy += image[newRow][newCol].rgbtGreen * Gy[i + 1][j + 1];
                        sumBlueGy += image[newRow][newCol].rgbtBlue * Gy[i + 1][j + 1];
                    }
                }

                // Calculate combined value and cap at 255
                int combinedRed = round(sqrt(pow(sumRedGx, 2) + pow(sumRedGy, 2)));
                int combinedGreen = round(sqrt(pow(sumGreenGx, 2) + pow(sumGreenGy, 2)));
                int combinedBlue = round(sqrt(pow(sumBlueGx, 2) + pow(sumBlueGy, 2)));

                if (combinedRed > 255)
                    combinedRed = 255;
                if (combinedGreen > 255)
                    combinedGreen = 255;
                if (combinedBlue > 255)
                    combinedBlue = 255;

                // Assign new pixel value
                tempImage[row][col].rgbtRed = combinedRed;
                tempImage[row][col].rgbtGreen = combinedGreen;
                tempImage[row][col].rgbtBlue = combinedBlue;
            }
        }
    }

    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            image[row][col] = tempImage[row][col];
        }
    }

    return;
}
