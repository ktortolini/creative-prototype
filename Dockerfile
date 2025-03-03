FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

# Install CA certificates for SSL connections
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Cache dependencies
RUN deno cache main.ts

# Run the application with all necessary permissions
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]