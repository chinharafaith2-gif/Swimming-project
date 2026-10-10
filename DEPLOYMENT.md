# Deployment Guide for Render

This project is a PHP + MySQL website for the Harare Amateur Swimming Club. It includes static HTML pages and a PHP contact form that writes submissions to a MySQL database.

## Project type

- Frontend: HTML, CSS, JavaScript
- Backend: PHP
- Database: MySQL
- Hosting target: Render

## Requirements before deployment

1. Push the project to a GitHub repository.
2. Create a MySQL database on Render.
3. Have access to the Render dashboard.

## Files included for deployment

- `Dockerfile`
- `render.yaml`
- `index.php`
- `process_form.php`
- `includes/db_connect.php`
- `sql/schema.sql`

## Render setup steps

### 1. Create the MySQL database

In Render:

1. Click New > Postgres or MySQL database.
2. Choose MySQL.
3. Name it something like `harare-swimming-db`.
4. Wait for the database to be created.
5. Copy the host, user, password, and database name.

### 2. Create the web service

In Render:

1. Click New > Web Service.
2. Connect your GitHub repository.
3. Set the runtime to Docker.
4. Confirm the project root is the repository root.
5. Click Create Web Service.

### 3. Add environment variables

In the Render service environment section, add these variables:

- `DB_HOST` = dpg-db4ftvlg1s2s739aa2n0-a
- `DB_USER` = tanaka
- `DB_PASS` = aaOzsDd1Cb3wyrFk6ESVNqt1OWTDfLXZ
- `DB_NAME` = harareswimmingdb
- `APP_ENV` = `production`

### 4. Run the database schema

Open your Render MySQL database and run the SQL from:

- `sql/schema.sql`

This creates the `submissions` table used by the form.

## Important app behavior

The contact form sends data to:

- `process_form.php`

That file inserts the form submission into the `submissions` table using the database connection in:

- `includes/db_connect.php`

The app expects MySQL connection details from environment variables.

## Root URL behavior

The file:

- `index.php`

redirects `/` to `/home.html` so the site opens correctly.

## Build and deploy notes

The Dockerfile uses the PHP Apache image:

```dockerfile
FROM php:8.2-apache

WORKDIR /var/www/html

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

EXPOSE 80

CMD ["apache2-foreground"]
```

This is enough for the app to serve static pages and PHP scripts on Render.

## Checking deployment

After deployment, open the Render URL and verify:

1. The homepage loads.
2. The contact form submits successfully.
3. Form data is saved in the MySQL `submissions` table.
4. The database connection is not failing.

## Common deployment issues

### Database connection error

Check:

- `DB_HOST` is correct
- `DB_USER` and `DB_PASS` match the Render database
- `DB_NAME` points to the database you created

### Form submit fails

Check:

- The `submissions` table exists
- The field names match the form input names in `contact.html`
- The `process_form.php` file is reachable by the browser

### Page not loading

Check:

- The repo has been deployed from the correct GitHub branch
- The Dockerfile is present in the project root
- The web service is using Docker runtime

## Example Render env values

```text
DB_HOST = dpg-xxxxxx-a.oregon-postgres.render.com
DB_USER = myuser
DB_PASS = mypassword
DB_NAME = mydatabase
APP_ENV = production
```

## Final deployment reminder

Once the web service is live, the app should be available at the Render URL, and the contact form should work after the MySQL database is configured.
