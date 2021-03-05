SELECT p.id AS post_id, p.title,p.content,p.img,p.author_id,p.date_created ,u.username AS author_username
FROM helo_posts p
JOIN helo_users u
ON u.id = p.author_id
ORDER BY date_created ASC