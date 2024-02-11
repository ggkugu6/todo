create table users
(
    user_id           serial primary key,
    name              varchar(255),
    last_name         varchar(255),
    surname           varchar(255),
    full_name         varchar(255),
    login             varchar(64) default '',
    passsword         varchar(255),
    role              varchar(255)
)

create table tasks
(
    id                serial primary key,
    title             varchar(255) not null,
    description       text,
    priority          text,
    status            text,
    created_at        timestamp not null,
    deleted_at        timestamp,
    ended_at          timestamp,
    update_at         timestamp,
    creator_id        int,
    responsible_id    int
)


