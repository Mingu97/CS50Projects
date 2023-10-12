SELECT
    people.name
FROM
    people
WHERE
    people.id IN (
        SELECT
            stars.person_id
        FROM
            stars
            JOIN movies ON movies.id = stars.movie_id
        WHERE
            movies.title LIKE 'Toy Story%'
    );