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
- npm install react-router-dom
- Loading component is created.
- 404 page not found component is created.

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
