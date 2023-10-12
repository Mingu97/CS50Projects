-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Preliminary Investigation
SELECT
    *
FROM
    crime_scene_reports
WHERE
    MONTH = 7
    AND DAY = 28
    AND street = 'Humphrey Street';

-- ID 295 Report
--ROBBERY TIME AT 10.15
--Interview Check
SELECT
    *
FROM
    interviews
WHERE
    MONTH = 7
    AND DAY = 28
    AND YEAR = 2021
LIMIT
    10;

-- Related IDs 161,162, 163
--161 Ten minutes 10.25 after theft In a car, bakery parking lot, - Footage opportunity to check
--162 ATM Leggett Street, Morning, Some Money
--163 Fiftyville flight 29th July, called after leaving the robbery, less than a minute call.
--Bakery Parking Lot Check for cars
SELECT
    people.name, bsl.activity, bsl.license_plate, bsl.year, bsl.month,bsl.day,bsl.hour,bsl.minute
FROM
    bakery_security_logs as bsl
JOIN people ON people.license_plate = bsl.license_plate
WHERE
    YEAR = 2021
    AND MONTH = 7
    AND DAY = 28
    AND HOUR = 10
    AND MINUTE >= 15
    AND MINUTE < 35;

--ATM CHECK:
SELECT
*
FROM
    atm_transactions
WHERE
    YEAR = 2021
    AND MONTH = 7
    AND DAY = 28
    AND atm_location = 'Leggett Street';

-- ADD name of withdraws from ATMS
SELECT a.*, people.name
FROM atm_transactions a
JOIN bank_accounts on a.account_number = bank_accounts.account_number
JOIN people on bank_accounts.person_id = people.id
WHERE
    YEAR = 2021
    AND MONTH = 7
    AND DAY = 28
    AND atm_location = 'Leggett Street';
--CHECK PHONE CALLS

SELECT p.name, pc.caller,pc.receiver,pc.year,pc.month,pc.day,pc.duration
FROM phone_calls pc
JOIN people p on pc.caller = p.phone_number
WHERE pc.year = 2021 AND pc.month = 7 AND pc.day = 28 and pc.duration <60;

-- BRUCE & DIANA  Phone numbers Bruce   | (367) 555-5533 & Diana   | (770) 555-1861
SELECT
    *
FROM
    flights
WHERE
    YEAR = 2021
    AND MONTH = 7
    AND DAY = 29
ORDER BY hour ASC
LIMIT
    10;

--Passport numbers for flights on that day:
SELECT
    passengers.passport_number
FROM
    passengers
WHERE
    passengers.flight_id IN (
        SELECT
            flights.id
        FROM
            flights
        WHERE
            YEAR = 2021
            AND MONTH = 7
            AND DAY = 28
        LIMIT
            10
    );

-- Possible flights 8 -- First Flight La guardia airport NYC
SELECT f.*, origin.full_name AS origin_airport, destination.full_name AS destination_airport
FROM flights f
JOIN airports origin on f.origin_airport_id = origin.id
JOIN airports destination on f.destination_airport_id = destination.id
WHERE origin.id = 8 and f.year = 2021 and f.month = 7 and f.day = 29
ORDER by f.hour, f.minute; -- FLIGHT 36

-- Adding up everything

SELECT p.name
FROM bakery_security_logs as bsl
JOIN people p ON p.license_plate = bsl.license_plate
JOIN bank_accounts ba on ba.person_id = p.id
JOIN atm_transactions at ON at.account_number = ba.account_number
JOIN phone_calls pc on pc.caller = p.phone_number
WHERE
    bsl.year = 2021
    AND bsl.month = 7
    AND bsl.day = 28
    AND bsl.hour = 10
    AND bsl.minute BETWEEN 15 AND 25

AND at.atm_location = 'Leggett Street' AND at.year = 2021 AND at.month = 7 AND at.day = 28 AND at.transaction_type = 'withdraw'
AND pc.year = 2021 AND pc.month = 7 AND pc.day = 28 AND pc.duration < 60;


-- BRUCE OR DIANA - that were at the bakery, withdraw from ATM and pc < 60 s.

-- Finding the one from flight.

SELECT p.name
FROM people p
JOIN passengers pa ON pa.passport_number = p.passport_number
WHERE pa.flight_id = 36
AND p.name IN ('Bruce', 'Diana');
-- BRUCE

-- Check Accomplice from calls
SELECT p.name, pc.caller,pc.receiver,pc.year,pc.month,pc.day,pc.duration, r.name
FROM phone_calls pc
JOIN people p on pc.caller = p.phone_number
JOIN people r on pc.receiver = r.phone_number
WHERE pc.year = 2021 AND pc.month = 7 AND pc.day = 28 and pc.duration <60;

-- Robin accomplice