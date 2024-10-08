Assignment: Recipe Search Application

Python Version -> Python 3.11.5
pip version -> pip 24.2
django version -> django-5.1.1

node version -> v20.12.2
npm version -> 10.8.3
react version -> ^18.3.1

Data: https://www.kaggle.com/datasets/hugodarwood/epirecipes
Open Search Official Documentation : https://opensearch.org/docs/latest/about/

Created folder named client for managing frontend(React) of the application.
Created folder named server for managing  backent(Django) of the application.

Setup docker to setup open search and now it is running properly.
        File location : desktop/opensearch/docker-compose.yml
        -> docker compose up: This will start two OpenSearch nodes and OpenSearch Dashboards.
        added docker-compose.yml file in docker folder in project directory.

Frontend
- Installed Tailwind CSS for frontend design.
        Reference -> https://tailwindcss.com/docs/guides/vite
- Created folders named components and pages in src.
- Created Login component for the application in auth folder.
- Created folder named 'home' to manage home page components.
- For getting icons
        -> npm install lucide-react
- Loading component is created.
- 404 page not found component is created.
- npm install axios jwt-decode react-router-dom
- Created constants.js and api.js
- Created an enviroment variable file .evn
- Created a file named ProtectedRoute.jsx in components folder.
- npm install react-router-dom formik yup @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons axios jwt-decode
        -> for login page
- In App.jsx routes related to this application is setup.
- Login Page implemented.
- npm i react-toastify
- Created a simple registration page for now and will update later to include otp verification in it.
- Created a folder named user in pages to manage pages related to users.
- Created a folder named recipe-search in pages to save all the components related to that.
- Created Dashboard for searching purpose.
- Added searching, filteration and recipe card.
- Created About page.
- Registration page is re-designed.
- Profile details updation page completed.

Backend
- Created Virtual Environment named venv to manage all the python packages related to the project.
        -> python -m venv venv
- Installed Latest version of Django -> django-5.1.1
        -> pip install django
- Created requirements.txt file.
- Created a django project named server
        -> django-admin startproject server .
- Created .env file to store secret credentials.
        -> pip install python-dotenv
- Installed pandas to extract data from csv file downloaded from Kaggle.
        -> pip install pandas
- Created a django app named test_app for testing purpose.
- Django restframework setup.
        -> pip install djangorestframework django-cors-headers
- Created custom user model to use email field instead of username field.
        -> pip install django-use-email-as-username
- Created an app named opensearch_util for the purpose of using opensearch.
- Installed the OpenSearch Python Client: You can use the official OpenSearch Python client using pip.
        -> pip install opensearch-py
- Added OpenSearch Configuration in settings.py file.
- Created views and urls for opensearch and tested it(Working✔).
- csv file from kaggle where data is stored is saved in folder named DataFromKaggle in server directory.
- Creating a app named accounts from authentication purpose like registration, login ...etc.
- Created a file named accounts.rest in API Documentation for testing api's related to authentication.
- Created a model named profile to include additional details about user which is one to one relation with user model.
- Created a file named signals.py create profile automatically when user is created with same id as user.
        -> Now a profile is created related with user whenever a new user is created.
- Created custom token obtain pair view to include profile role and user is_active in token.
- Modified User Serializer in accounts so that role in profile can be also included in it during registration.
- Created UserStatusSerializer in accounts.serializer to check user is active or not in frontend.
        -> Created view and url for this.
- Now the protected route in frontend is checking each time from backend whether is user is active or not.
- To use image field in django.
        -> pip install Pillow
- Created serializer in accounts app for custom User.
        Created UserSerializer
- Created a generic view for creating user.
- For jwt authentication
        -> pip install djangorestframework-simplejwt
- Registration api is tested and it is working properly.
- API for getting token using credential is tested and working properly.
- registration, get_token, refresh token is working properly in backend.
- Set up media in backent to save images for now I will use s3 bucket at the time of deloyment
        MEDIA_URL = '/media/'
        MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
        pip install pillow
- Created a app named recipes for implementing open search functionlity on recipe on django
        -> python manage.py startapp recipes
- Create Views in recipes/views.py: Implement API endpoints to interact with OpenSearch.
- Created recipes.rest to test api endpoints.
- Created a serializer in accounts app for profile details update.
- Created serializer, view and url for profile details update.



OpenSearch
- Created index named epirecipes in opensearch and converted data from csv file to documents and add in that index
- Retreival of data from opensearch is also tested ✔.
- I have created a folder in main project directory named 'recipe_data_management' to manage all the resource related to append the data from csv file from kaggle to open search.
- Also created a python virtual enviroment named virenv for this purpose.
        -> pip install pandas numpy opensearch-py requests
- File name import_recipes_to_opensearch.py is created and logic for importing data from csv to open search is added in it.
- Security credentials related to open search are stored in .env file.
        -> pip install python-dotenv
- csv file from kaggle is renamed to recipes.csv and stored in 'recipe_data_management' folder.
- Finally run the import_recipes_to_opensearch.py script it will create index named 'recipes' in the open search save the data from csv as documents in it.
- Mapping for indexing used in this project. 
        mapping = {
        "mappings": {
            "properties": {
                "title": {
                    "type": "text",  # For full-text search
                    "analyzer": "standard"
                },
                "ingredients": {
                    "type": "text"  # Also for full-text search
                },
                "directions": {
                    "type": "text"
                },
                "calories": {
                    "type": "float"  # Numeric type for aggregation and filtering
                },
                "protein": {
                    "type": "float"
                },
                "fat": {
                    "type": "float"
                },
                "date": {
                    "type": "date"  # Date type for time-based queries
                },
                "categories": {
                    "type": "keyword"  # For exact matches (e.g., filtering)
                }
            }
        }}
    