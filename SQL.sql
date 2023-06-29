CREATE EXTENSION "uuid-ossp";

CREATE TABLE users(
  id uuid default uuid_generate_v4() primary key not null,
  username varchar(64) not null,
  password varchar(64) not null  
);

CREATE TABLE todos(
  id uuid default uuid_generate_v4() primary key not null,
  title varchar(128) not null,
  description text,
  important boolean default false,
  user_id uuid not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

