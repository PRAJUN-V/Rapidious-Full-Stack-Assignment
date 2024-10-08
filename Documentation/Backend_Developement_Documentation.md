## Backend Development

- **Virtual Environment**:
  - Created a virtual environment named `venv` to manage all Python packages: `python -m venv venv`.

- **Django Setup**:
  - Installed the latest version of Django: `pip install django`.
  - Created a `requirements.txt` file.
  - Created a Django project named `server`: `django-admin startproject server .`.
  - Created a `.env` file to store secret credentials: `pip install python-dotenv`.
  
- **Data Handling**:
  - Installed Pandas to extract data from the CSV file downloaded from Kaggle: `pip install pandas`.
  - Created a Django app named `test_app` for testing purposes.
  
- **API Development**:
  - Set up Django REST Framework: `pip install djangorestframework django-cors-headers`.
  - Created a custom user model to use the email field instead of the username field: `pip install django-use-email-as-username`.
  
- **OpenSearch Integration**:
  - Created an app named `opensearch_util` for OpenSearch functionalities.
  - Installed OpenSearch Python Client: `pip install opensearch-py`.
  - Added OpenSearch configuration in `settings.py`.
  
- **User Management**:
  - Created an app named `accounts` for authentication purposes (registration, login, etc.).
  - Created a model named `profile` for additional user details.
  - Implemented token authentication with JWT: `pip install djangorestframework-simplejwt`.
  
- **API Testing**:
  - Registered APIs are tested and confirmed working for user registration, token acquisition, and user status validation.
  
---