SELECT movies.title
FROM movies
JOIN stars AS star1 ON movies.id = star1.movie_id
JOIN stars AS star2 ON movies.id = star2.movie_id
JOIN people AS pers1 ON star1.person_id =
pers1.id AND pers1.name LIKE '%Bradley Cooper%'
JOIN people AS pers2 ON star2.person_id = pers2.id AND pers2.name LIKE '%Jennifer Lawrence%'
WHERE star1.person_id != star2.person_id;