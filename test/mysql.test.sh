#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found. Please create a .env file with your database credentials."
  exit 1
fi

# Check if required environment variables are set
if [ -z "$DO_MYSQL_HOST" ] || [ -z "$DO_MYSQL_USER" ] || [ -z "$DO_MYSQL_PASSWORD" ] || [ -z "$DO_MYSQL_DATABASE" ]; then
  echo "Error: Missing required environment variables in .env file."
  echo "Please ensure DO_MYSQL_HOST, DO_MYSQL_USER, DO_MYSQL_PASSWORD, and DO_MYSQL_DATABASE are set."
  exit 1
fi

# Set port with a default if not specified
PORT=${DO_MYSQL_PORT:-25060}

# Decode the base64 password
DECODED_PASSWORD=$(echo -n "$DO_MYSQL_PASSWORD" | base64 --decode)

echo "Testing connection to MySQL database..."
echo "Host: $DO_MYSQL_HOST"
echo "User: $DO_MYSQL_USER"
echo "Database: $DO_MYSQL_DATABASE"
echo "Port: $PORT"

# Test connection with decoded password
if mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED -e "SELECT 'Connection successful!' AS result;" 2>/dev/null; then
  echo "✅ Connection successful!"
  
  echo -e "\n📋 Listing all tables in database:"
  mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED --table -e "SHOW TABLES;"
  echo "✅ Tables found!"
  
  echo -e "\n📊 Count of records in 'projects' table:"
  mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED --table -e "SELECT COUNT(*) AS 'Total Projects' FROM projects;"
  echo "✅ Records found!"
  
  echo -e "\n📊 Table structure of 'projects':"
  mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED --table -e "DESCRIBE projects;"
  echo "✅ Structure found!"
  
  echo -e "\n⭐ Project image URLs:"
  mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED --table -e "SELECT id, project_name, img_url FROM projects;"
  echo "✅ Image URLs retrieved!"

else
  echo "❌ Connection failed!"
  echo "Error details:"
  mysql -h "$DO_MYSQL_HOST" -u "$DO_MYSQL_USER" -p"$DECODED_PASSWORD" -P "$PORT" -D "$DO_MYSQL_DATABASE" --ssl-mode=REQUIRED -e "SELECT 1;" 2>&1
fi

# Display connection string in the same format as database.ts
echo -e "\n🔗 Connection string used:"
CONNECTION_STRING="mysql://$DO_MYSQL_USER:$DECODED_PASSWORD@$DO_MYSQL_HOST:$PORT/$DO_MYSQL_DATABASE"
echo "$CONNECTION_STRING"
echo "✅ Connection string generated!"