# DJANGO+REST Dockerization Tutorial Here: 
# https://dockertraining.readthedocs.io/en/latest/django/

# The first instruction is what image we want to base our container on
# We Use an alpine version of docker cause consists in a 
# minimal Linux version (with python)
FROM python:3.10-alpine

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app/backend
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory (I tried to separate backend from frontend)
WORKDIR /app/backend

# Copy and Install any needed packages specified in requirements.txt
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Now that you have all the requirements copy the entire Django Folder 
# in the workdir
COPY . .

# Make Migrations and Run the server
CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000