#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#include "wav.h"

int check_format(WAVHEADER header);
int get_block_size(WAVHEADER header);

int main(int argc, char *argv[])
{
    // Ensure proper usage
    // TODO #1
    if (argc != 3)
    {
        printf("Usage: %s input.wav output.wav\n", argv[0]);
        return 1;
    }

    // Open input file for reading
    // TODO #2
    FILE *input_file = fopen(argv[1], "rb");
    if (input_file == NULL)
    {
        printf("Error opening input file\n");
        return 1;
    }

    // Read header
    // TODO #3
    WAVHEADER header;
    if (fread(&header, sizeof(WAVHEADER), 1, input_file) != 1)
    {
        printf("Error reading header from input file\n");
        fclose(input_file);
        return 1;
    }

    // Use check_format to ensure WAV format
    // TODO #4
    if (check_format(header) != 1)
    {
        printf("Invalid WAV Format");
    }
    // Open output file for writing
    // TODO #5
    FILE *output_file = fopen(argv[2], "wb");
    if (output_file == NULL)
    {
        printf("Error opening output file\n");
        fclose(input_file);
        return 1;
    }

    // Write header to file
    // TODO #6
    if (fwrite(&header, sizeof(WAVHEADER), 1, output_file) != 1)
    {
        printf("Error writing header to output file\n");
        fclose(input_file);
        fclose(output_file);
        return 1;
    }

    // Use get_block_size to calculate size of block
    // TODO #7
    // Calculate the size of each block (in bytes)
    int block_size = get_block_size(header);

    // Write reversed audio to file
    // TODO #8
    // Move the file pointer to the end of the audio data
    fseek(input_file, 0, SEEK_END);
    long audio_end = ftell(input_file);

    // Iterate through the audio data from the end to the beginning
    while (audio_end > sizeof(WAVHEADER))
    {
        // Move the file pointer to the beginning of the current block
        fseek(input_file, audio_end - block_size, SEEK_SET);

        // Read the block of audio data
        uint8_t audio_block[block_size];
        if (fread(audio_block, 1, block_size, input_file) != block_size)
        {
            printf("Error reading audio data from input file\n");
            fclose(input_file);
            fclose(output_file);
            return 1;
        }

        // Write the audio block to the output file
        if (fwrite(audio_block, 1, block_size, output_file) != block_size)
        {
            printf("Error writing audio data to output file\n");
            fclose(input_file);
            fclose(output_file);
            return 1;
        }

        // Move the file pointer back one block size
        audio_end -= block_size;
    }

    // Close both input and output files
    fclose(input_file);
    fclose(output_file);
}

int check_format(WAVHEADER header)
{
    if (header.format[0] == 'W' && header.format[1] == 'A' && header.format[2] == 'V' && header.format[3] == 'E')
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

int get_block_size(WAVHEADER header)
{
    return (header.numChannels * (header.bitsPerSample / 8));
}
