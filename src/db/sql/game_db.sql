CREATE TABLE IF NOT EXISTS game_log
(
    id          VARCHAR(36) PRIMARY KEY,
    user1_id    VARCHAR(36) NOT NULL,
    user2_id    VARCHAR(36) NOT NULL,
    user1_win   BOOLEAN     NOT NULL,
    user1_score INT         NOT NULL,
    user2_score INT         NOT NULL,
    end_time    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);