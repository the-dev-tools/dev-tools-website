# Use a minimal static file server
FROM pierrezemb/gostatic

# Copy your built static site into the container
COPY ./public /srv/http

# Default gostatic port
EXPOSE 8043

# Run the server
CMD ["-port", "8043", "-path", "/srv/http"]
