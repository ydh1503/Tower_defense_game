CREATE TABLE IF NOT EXISTS user
(
    id         VARCHAR(36) PRIMARY KEY,
    name       VARCHAR(255) UNIQUE NOT NULL,
    pw         VARCHAR(255) UNIQUE NOT NULL,
    high_score INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS game_log
(
    id           VARCHAR(36) PRIMARY KEY,
    user1_id     VARCHAR(36) NOT NULL,
    user2_id     VARCHAR(36) NOT NULL,
    user1_win    BOOLEAN NOT NULL,
    user1_score  INT NOT NULL,
    user2_score  INT NOT NULL,
    end_time     DATETIME DEFAULT CURRENT_TIMESTAMP,
);
