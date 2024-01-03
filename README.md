
# Django and ReactJS App

This repository contains a Django and ReactJS application that has been developed with a focus on high component reusability, proper state management, and adherence to code standards. The application includes a Django backend and a ReactJS frontend, providing a full-stack web solution.
## Installation

Install Python
https://www.python.org/downloads/

Install Node
https://nodejs.org/en/download/current

Clone the repository

### Backend Setup

Install requirements.txt
```bash
  cd umpisa
  pip install -r requirements.txt
```
Run the Backend
```bash
  cd umpisa/umpisabackend/
  python manage.py runserver
```

The Backend should already be running at http://127.0.0.1:8000/

### Frontend Setup

Install dependencies
```bash
  npm install
```
Run the server
```bash
  npm start
```

The App should already be running at http://localhost:3000/

### Credentials Setup

You can create account by using these steps

Create Python Super User
```bash
  cd umpisa/umpisabackend/
  python manage.py createsuperuser
```
There should be a prompt asking for Email Address and Password

After a successful creation,
You can also create using Python Django Admin Interface
by navigating to http://127.0.0.1:8000/admin/ 

You can login with your superuser account or any account that you will create 
under the Admin Interface

You can also use:
```bash
  Email: user@user.com
  Password: user
```

Let me know if you have questions
Feel free to send me an email at:
alexuskarlj@gmail.com