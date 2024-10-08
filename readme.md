# EpiRecipes Search Platform

## Assignment: Recipe Search Application

### Project Overview
The EpiRecipes Search Platform is a web application designed to allow users to search and filter recipes easily. This application leverages the EpiRecipes dataset and provides a user-friendly interface for a seamless recipe discovery experience.

### Project Details
For complete details about the assignment, please refer to the following link:
[Complete Assignment Details](https://drive.google.com/file/d/12dv5_kyeURgYnhDw0kBmAEfRREdOkJD0/view?usp=drive_link)

### Technologies Used
- **Frontend**: React
- **Backend**: Django
- **Database**: OpenSearch
- **Version Control**: GitHub

# EpiRecipes Search Platform

## Assignment: Recipe Search Application

### Objective
Develop a full-stack web application that indexes the "EpiRecipes" dataset into OpenSearch, provides a user-friendly interface for searching and filtering recipes, and demonstrates proficiency in React for frontend development, Python (Flask/Django/FastAPI/any other) for backend development, and version control using GitHub.

### Project Overview
You are tasked with creating a comprehensive recipe search platform that allows users to efficiently search and filter through a vast collection of recipes. The application should mimic the user experience of leading e-commerce platforms like Flipkart or Amazon, ensuring intuitive navigation and responsive design.

---

## Technical Requirements

### 1. Data Indexing with OpenSearch
- **Dataset**: Utilize the EpiRecipes dataset from [Kaggle](https://www.kaggle.com/datasets/hugodarwood/epirecipes).
  
- **OpenSearch Setup**:
  - Install OpenSearch locally.
  - Create an index tailored to the EpiRecipes dataset.
  - Ingest the dataset into OpenSearch, ensuring proper mapping of fields for optimized search performance.

- **Documentation**: 
  - Provide scripts or instructions for setting up OpenSearch and indexing the data.

### 2. Backend Development
- **Framework**: Choose one of the following Python frameworks: Flask, Django, FastAPI, or any other.

- **API Development**:
  - Develop RESTful APIs to handle search queries and filtering.
  - Implement endpoints for:
    - Retrieving recipes based on search keywords.
    - Filtering recipes by categories such as ingredients, cuisine, preparation time, etc.
    - Pagination of search results.

- **Integration with OpenSearch**:
  - Ensure seamless communication between the backend and OpenSearch for data retrieval.

- **Documentation**:
  - Include setup instructions, dependency installation, and API endpoint descriptions.

### 3. Frontend Development
- **Framework**: React.js

- **Design Specifications**:
  - Create a single-page application (SPA) with a responsive design.
  - Design a user interface inspired by e-commerce platforms like Flipkart or Amazon.

- **Features**:
  - **Search Functionality**: Allow users to search for recipes using keywords.
  - **Filters**: Implement dynamic filters that update search results in real-time.
  - **Recipe Display**: Show recipe details in an organized and visually appealing manner.
  - **Navigation**: Ensure smooth navigation between different sections of the application.

- **Integration with Backend**:
  - Connect the React frontend with the Python backend APIs for data retrieval and interaction.

- **Documentation**:
  - Provide instructions on setting up the React project, installing dependencies, and running the application locally.

### 4. Version Control and Deployment
- **GitHub Repository**:
  - Host the complete project code on GitHub.
  - Ensure the repository is public and well-organized with clear commit messages.

- **README File**:
  - Include a comprehensive README detailing:
    - Project description and objectives.
    - Step-by-step setup and installation instructions.
    - Usage guidelines.
    - Technologies and frameworks used.
    - Link to the demo video on YouTube.

### 5. Demo Video and Final Submission
- Create a walkthrough video demonstrating the application's features and functionalities.
- Upload the video to YouTube and embed it in the GitHub README page.
- Submit the link to the YouTube video, GitHub, and any other materials to: recruitment@rapidious.com.

---

## Technical Stack

### Backend
- **Python Version**: 3.11.5
- **Django Version**: 5.1.1
- **Pip Version**: 24.2

### Frontend
- **Node Version**: v20.12.2
- **NPM Version**: 10.8.3
- **React Version**: ^18.3.1

---

## Project Structure

- **Client**: Contains the frontend (React) of the application.
- **Server**: Contains the backend (Django) of the application.

---

## OpenSearch Setup

- **Docker Setup**:
  - Created a folder named `docker` in the project directory.
  - Added `docker-compose.yml` file to set up OpenSearch.
  - Run the command `docker-compose up` to start two OpenSearch nodes and OpenSearch Dashboards.
  - File location: `desktop/opensearch/docker-compose.yml`.

---

## Frontend Development

- **Tailwind CSS**:
  - Installed Tailwind CSS for frontend design. [Reference](https://tailwindcss.com/docs/guides/vite).
  
- **Folder Structure**:
  - Created folders named `components` and `pages` in `src`.
  - Created `Login` component in the `auth` folder.
  - Created a folder named `home` to manage homepage components.
  
- **Icon Integration**:
  - Installed Lucide React for icons: `npm install lucide-react`.
  
- **Component Development**:
  - Created a loading component.
  - Created a 404 page not found component.
  - Created constants.js and api.js.
  - Created an environment variable file `.env`.
  - Created `ProtectedRoute.jsx` in the components folder.

- **Routing and User Management**:
  - Set up routes related to the application in `App.jsx`.
  - Implemented Login Page.
  - Created a simple registration page with plans for OTP verification.
  - Created user-related pages and a folder named `recipe-search` for recipe-related components.
  
- **Dashboard Development**:
  - Created a Dashboard for searching with searching, filtering, and recipe card components.
  - Implemented Top 3 recipes on the Home page.
  - Implemented filters and search functionalities on the frontend.

---

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

## OpenSearch Data Management

- **Indexing**:
  - Created an index named `epirecipes` in OpenSearch and converted data from the CSV file to documents.
  - Retrieval of data from OpenSearch is tested and confirmed working.

- **Data Import**:
  - Created a folder in the main project directory named `recipe_data_management` to manage resources related to appending data from the CSV file.
  - Created a Python script `import_recipes_to_opensearch.py` to import data from CSV to OpenSearch.
  
- **Security**:
  - Security credentials related to OpenSearch are stored in the `.env` file.
  
- **CSV Management**:
  - The CSV file from Kaggle is renamed to `recipes.csv` and stored in the `recipe_data_management` folder.
  
- **Mapping for Indexing**:
```json
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "standard"
      },
      "ingredients": {
        "type": "text"
      },
      "directions": {
        "type": "text"
      },
      "calories": {
        "type": "float"
      },
      "protein": {
        "type": "float"
      },
      "fat": {
        "type": "float"
      },
      "date": {
        "type": "date"
      },
      "categories": {
        "type": "keyword"
      }
    }
  }
}
