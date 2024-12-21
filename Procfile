release: cd ideas_io && python manage.py migrate
web: cd ideas_io && python manage.py collectstatic --noinput && gunicorn --chdir ideas_io ideas_io.wsgi:application
