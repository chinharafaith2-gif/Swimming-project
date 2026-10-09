<?php
define('DB_ENABLED' ,true);
define('DB_HOST' ,'');
define('DB_USER' ,'');
define('DB_PASS' ,'');
define('DB_NAME' ,'');

function get_db_connection() {
    if(!DB_ENABLED) {
       return null;
    }

    try {
        $dsn='mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $options = [  
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
           
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        error_log('HAS:Database connection failed: ' . $e->getMessage());
        return null;
    }
}
    