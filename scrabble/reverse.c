#include "wav.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int check_format(WAVHEADER header, FILE *file);
int get_block_size(WAVHEADER header);

int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        printf("Usage: ./reverse inputFileName outputFileName\n");
        return 1;
    }

    FILE *inputFile = fopen(argv[1], "rb");
    if (inputFile == NULL)
    {
        printf("Error opening input file\n");
        return 1;
    }

    FILE *outputFile = fopen(argv[2], "wb");
    if (outputFile == NULL)
    {
        printf("Error opening output file\n");
        fclose(inputFile);
        return 1;
    }

    WAVHEADER header;
    fread(&header, sizeof(header), 1, inputFile);

    if (check_format(header, inputFile) != 0)
    {
        printf("Header format is not valid\n");
        fclose(inputFile);
        fclose(outputFile);
        return 1;
    }

    fwrite(&header, sizeof(header), 1, outputFile);

    int blockSize = get_block_size(header);
    int numFrames = header.chunkSize / blockSize;

    for (int frame = numFrames - 1; frame >= 0; frame--)
    {
        fseek(inputFile, sizeof(header) + frame * blockSize, SEEK_SET);

        unsigned char *buffer = (unsigned char *)malloc(blockSize);
        fread(buffer, 1, blockSize, inputFile);

        for (int i = 0; i < blockSize; i++)
        {
            buffer[i] = buffer[blockSize - i - 1];
        }

        fwrite(buffer, 1, blockSize, outputFile);
        free(buffer);
    }

    fclose(inputFile);
    fclose(outputFile);

    return 0;
}

int check_format(WAVHEADER header, FILE *file)
{
    char expectedName[4] = "WAVE";

    if (memcmp(header.format, expectedName, sizeof(expectedName)) == 0)
    {
        return 0;
    }

    return 1;
}

int get_block_size(WAVHEADER header)
{
    int block_size = header.blockAlign;
    return block_size;
}
