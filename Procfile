release: python manage.py migrate
web: gunicorn --chdir ideas_io ideas_io.wsgi:application
