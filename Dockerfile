FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY ./ideas_io /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Create log directory
RUN mkdir -p /var/log/gunicorn

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=ideas_io.settings
ENV PORT=8000

# Create a script to run migrations and start the server
RUN echo '#!/bin/bash\n\
\n\
echo "Waiting for PostgreSQL to be ready..."\n\
while ! pg_isready -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER; do\n\
  echo "Database not ready. Waiting..."\n\
  sleep 2\n\
done\n\
\n\
echo "PostgreSQL is ready. Running migrations..."\n\
python manage.py migrate --noinput\n\
\n\
echo "Collecting static files..."\n\
python manage.py collectstatic --noinput\n\
\n\
echo "Starting Gunicorn..."\n\
exec gunicorn ideas_io.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 4 \
    --threads 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    --log-level debug \
    --capture-output \
    --enable-stdio-inheritance' > /app/start.sh && chmod +x /app/start.sh

# Run the script
CMD ["/app/start.sh"]
