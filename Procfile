release: python manage.py migrate
web: python manage.py migrate && python manage.py collectstatic --noinput && gunicorn ideas_io.wsgi:application
