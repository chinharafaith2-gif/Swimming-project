CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50)  NOT NULL,
    email VARCHAR(100) NOT NULL,
   phone VARCHAR(255) ,
   reason ENUM('General Inquiry', 'Join', 'Sponsorship') NOT NULL DEFAULT 'General Inquiry',
   message TEXT,
   submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
