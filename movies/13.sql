SELECT DISTINCT
    (people.name)
FROM
    people
WHERE
    people.id IN (
        SELECT
            stars.person_id
        FROM
            stars
        WHERE
            stars.movie_id IN (
                SELECT
                    movies.id
                FROM
                    movies
                    JOIN stars AS kevB ON movies.id = kevB.movie_id
                    JOIN people ON kevB.person_id = people.id
                    AND people.name = 'Kevin Bacon'
            )
    ) AND people.name != 'Kevin Bacon';