INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000'::uuid, gen_random_uuid(), 'authenticated', 'authenticated', 'test1@terakoya.ai', crypt('123456', gen_salt('bf')), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"provider": "email", "providers": ["email"]}'::jsonb, '{}'::jsonb, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', '', '', ''),
('00000000-0000-0000-0000-000000000000'::uuid, gen_random_uuid(), 'authenticated', 'authenticated', 'test2@terakoya.ai', crypt('123456', gen_salt('bf')), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"provider": "email", "providers": ["email"]}'::jsonb, '{}'::jsonb, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', '', '', '');

INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
SELECT
    id AS provider_id,
    id AS user_id ,
    json_build_object('sub', id, 'email', email)::jsonb AS identity_data,
    'email' AS provider,
    CURRENT_TIMESTAMP AS last_sign_in_at,
    CURRENT_TIMESTAMP AS created_at,
    CURRENT_TIMESTAMP AS updated_at
FROM auth.users;
