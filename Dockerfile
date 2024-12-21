FROM python:3.11-slim

WORKDIR /app

COPY ideas_io/ .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn ideas_io.wsgi:application --bind 0.0.0.0:$PORT"]
