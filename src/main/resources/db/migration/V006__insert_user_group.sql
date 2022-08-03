INSERT INTO user_groups (user_id, group_id) VALUES (
	(SELECT id_user FROM users WHERE email = 'admin@mastersistema.com'), 1)
