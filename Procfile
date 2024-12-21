release: cd ideas_io && python manage.py migrate
web: cd ideas_io && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn ideas_io.wsgi:application
