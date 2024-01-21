# Io-No Application

The Io No application is a playful project designed to offer users the opportunity to organize events efficiently and in a fun way. The primary goal of the application is to simplify the process of managing event invitations, allowing users to create, invite friends, and manage responses in an intuitive and organized manner.


# Installation for devs


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Python](https://www.python.org/) (for Django backend)
- [Node.js](https://nodejs.org/) (for React frontend)

## Clone the Repository

```bash
git clone https://github.com/iono-developers/iono-app.git
cd iono-app
```

## Set Up Django Backend
1. Create a virtual environment (you may use venv or virtualenv):

```bash
python -m venv venv
```

2. Activate the virtual environment:

    On Windows:

    ```bash
    .\venv\Scripts\activate
    ```
    On macOS and Linux:

    ```bash
    source venv/bin/activate
    ```

3. Install Django and other dependencies:

```bash
pip install -r requirements.txt
```

4. Migrate the database:

``` bash
python manage.py migrate
```

5. Run the Django development server:

```bash
python manage.py runserver
```

The backend will be accessible at http://localhost:8000.

## Set Up React Frontend

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the React development server:

```bash
npm start
```

The frontend will be accessible at http://localhost:3000.


# Docker Installation

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Clone the Repository

```bash
git clone https://github.com/iono-developers/iono-app.git
cd iono-app
```

### Run the Docker

```bash
sudo docker-compose up --build
```

# Accessing the Application
**Frontend**: Open your web browser and go to http://localhost:3000

**Backend**: Access the Django backend at http://localhost:8000