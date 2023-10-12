# TODO

try:
    credit_card_number = int(input("Card Number:"))
except ValueError:
    print("Invalid Card, must be all integers")


def check_card(cardNumber):
    tempNumber = str(cardNumber)
    check_digit = 0
    cardLength = len(tempNumber)

    for i in range(cardLength - 2, -1, -1):
        if i % 2 == cardLength % 2:
            digit = int(tempNumber[i]) * 2
            if digit > 9:
                digit -= 9
            check_digit += digit
        else:
            check_digit += int(tempNumber[i])
    check_digit = (10 - (check_digit % 10)) % 10

    return int(tempNumber[cardLength - 1]) == check_digit


def validateCard(cardNumber, cardValid):
    tempCardNumber = str(cardNumber)
    cardLength = len(tempCardNumber)

    if cardValid == 1 and cardLength >= 13 and cardLength <= 19:
        if (cardNumber >= 34e13 and cardNumber < 35e13) or (
            cardNumber >= 37e13 and cardNumber < 38e13
        ):
            print("AMEX")
        elif cardNumber >= 51e14 and cardNumber < 56e14:
            print("MASTERCARD")
        elif (cardNumber >= 4e12 and cardNumber < 5e12) or (
            cardNumber >= 4e15 and cardNumber < 5e15
        ):
            print("VISA")
        else:
            print("INVALID")
    else:
        print("INVALID")


cardValidty = check_card(credit_card_number)

validateCard(credit_card_number, cardValidty)
