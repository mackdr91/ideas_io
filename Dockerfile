FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Make sure manage.py is executable
RUN chmod +x ideas_io/manage.py

# Set the working directory to where manage.py is
WORKDIR /app/ideas_io

# Expose port
EXPOSE 8000

# Command to run migrations and start the application
CMD ["gunicorn", "ideas_io.wsgi:application", "--bind", "0.0.0.0:8000"]
