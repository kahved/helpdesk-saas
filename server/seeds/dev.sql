BEGIN;

INSERT INTO users (name, email, password_hash, role, can_login)
VALUES
    ('Emma Wilson',   'emma@example.com',   'disabled', 'customer', FALSE),
    ('James Miller',  'james@example.com',  'disabled', 'customer', FALSE),
    ('Alex Morgan',   'alex@example.com',   'disabled', 'agent',    FALSE),
    ('Daniel Brooks', 'daniel@example.com', 'disabled', 'agent',    FALSE),
    ('Sarah Parker',  'sarah@example.com',  'disabled', 'admin',    FALSE);

INSERT INTO tickets (customer_id, assignee_id, title, description, status, priority)
SELECT
    customer.id,
    assignee.id,
    seed.title,
    seed.description,
    seed.status,
    seed.priority
FROM (
    VALUES
    ('emma@example.com', 'alex@example.com',
     'Unable to export reports', 'Reports fail to download as PDF.',
     'in_progress', 'high'),

    ('james@example.com', NULL,
     'Account settings not saving', 'Changes to profile settings are lost.',
     'open', 'medium'),

    ('emma@example.com', 'daniel@example.com',
     'Incorrect dashboard statistics', 'Dashboard displays outdated statistics.',
     'resolved', 'low'),

    ('james@example.com', NULL,
     'Application crashes on startup', 'The application closes immediately after launch.',
     'open', 'urgent')
) AS seed (customer_email, assignee_email, title, description, status, priority)
JOIN users AS customer ON customer.email = seed.customer_email
LEFT JOIN users AS assignee ON assignee.email = seed.assignee_email;

COMMIT;