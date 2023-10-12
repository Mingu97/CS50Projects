#include <cs50.h>
#include <stdio.h>

// declarations of functions
int checkSum(long temp, long cardNumber, bool cardValid);
int cardLengthCalc(long temp, long cardNumber, int cardLength);
void validateCard(long temp, long cardNumber, int cardValid, int charLength);

// main body of code procedure
int main(void)
{
    long cardNumber;
    do
    {
        cardNumber = get_long("Card Number: ");
    }
    while (cardNumber < 0);
    long temp = cardNumber;
    int cardLength = 0;
    int cardValid = 0;

    cardValid = checkSum(temp, cardNumber, cardValid);
    int charLength = cardLengthCalc(temp, cardNumber, cardLength);
    // printf("\n Card Validity : %d \n", cardValid);

    validateCard(temp, cardNumber, cardValid, charLength);
}

// Check Sum Function - mathematical calculations for verification of cards.
int checkSum(long temp, long cardNumber, bool cardValid)
{
    int digit = 0;
    int remainder = 0;
    int sum1 = 0;
    int sum2 = 0;
    // First part - Calculates the total sum (Check sum)  Starts off by checking every other 2 digits & sum
    while (temp > 0)
    {
        digit = ((temp / 10) % 10) * 2; // *2 every other digit by 2

        while (digit > 0)
        {
            remainder = digit % 10;
            sum1 += remainder; // Adding to sum
            digit /= 10;
        }
        temp /= 100;
    }

    // Second pard - Resetting counters to be used again for other digits (second sum)
    remainder = 0;
    temp = cardNumber;

    while (temp > 0)
    {
        remainder = temp % 10;
        sum2 += remainder; // Adding to second sum
        temp /= 100;
    }
    // Adding up both values of sums & checking the value to be used for later on verification and card provider identifier
    long isValidNum = sum1 + sum2;
    long isValidNumValue = isValidNum % 10;

    if (isValidNumValue == 0)
    {
        cardValid = true;
        // printf("Sum1, %i, Sum2 %i, cardValid %d, ValidNumValue: %li",sum1,sum2,cardValid, isValidNumValue);
        return cardValid;
    }
    else
    {
        return false;
    }
}

// Card Length Validation Function
int cardLengthCalc(long temp, long cardNumber, int cardLength)
{
    // card number length for more verification
    temp = cardNumber;

    while (temp > 0)
    {
        temp /= 10;
        cardLength++;
    }

    return cardLength;
}

// Final Validations Function
void validateCard(long temp, long cardNumber, int cardValid, int charLength)
{
    // checking card number value validity & length
    temp = cardNumber;

    if (cardValid == 1 && charLength >= 13 && charLength <= 19)
    {
        if ((temp >= 34e13 && temp < 35e13) || (temp >= 37e13 && temp < 38e13))
        {
            printf("AMEX\n");
        }
        else if (temp >= 51e14 && temp < 56e14)
        {
            printf("MASTERCARD\n");
        }
        else if ((temp >= 4e12 && temp < 5e12) || (temp >= 4e15 && temp < 5e15))
        {
            printf("VISA\n");
        }
        else
        {
            printf("INVALID\n");
        }
    }
    else
    {
        printf("INVALID\n");
    }
}
