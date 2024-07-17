CREATE TABLE IF NOT EXISTS user
(
    id         VARCHAR(36) PRIMARY KEY,
    name       VARCHAR(255) UNIQUE NOT NULL,
    pw         VARCHAR(255) NOT NULL,
    high_score INT DEFAULT 0
);
