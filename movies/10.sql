SELECT DISTINCT(people.name) FROM people WHERE people.id IN(SELECT directors.person_id FROM directors
    WHERE directors.movie_id IN (
        SELECT
            movies.id
        FROM
            movies
            JOIN ratings ON movies.id = ratings.movie_id
            AND ratings.rating >= 9
    ));