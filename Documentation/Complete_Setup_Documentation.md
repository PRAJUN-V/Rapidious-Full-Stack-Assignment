# EpiRecipes Search Platform

## Assignment: Recipe Search Application

### Objective
Develop a full-stack web application that indexes the "EpiRecipes" dataset into OpenSearch, provides a user-friendly interface for searching and filtering recipes, and demonstrates proficiency in React for frontend development, Python (Flask/Django/FastAPI/any other) for backend development, and version control using GitHub.

### Project Overview
This project aims to create a comprehensive recipe search platform that allows users to efficiently search and filter through a vast collection of recipes. The application mimics the user experience of leading e-commerce platforms like Flipkart or Amazon, ensuring intuitive navigation and responsive design.

---

## Technical Requirements

### 1. Data Indexing with OpenSearch
- **Dataset**: Utilize the EpiRecipes dataset from Kaggle. [EpiRecipes Dataset](https://www.kaggle.com/datasets/hugodarwood/epirecipes)

- **OpenSearch Setup**:
  - Install OpenSearch locally.
  - Create an index tailored to the EpiRecipes dataset.
  - Ingest the dataset into OpenSearch, ensuring proper mapping of fields for optimized search performance.

- **Documentation**:
  - Provide scripts or instructions for setting up OpenSearch and indexing the data.

### 2. Backend Development
- **Framework**: Django

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
  - Search Functionality: Allow users to search for recipes using keywords.
  - Filters: Implement dynamic filters that update search results in real-time.
  - Recipe Display: Show recipe details in an organized and visually appealing manner.
  - Navigation: Ensure smooth navigation between different sections of the application.

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
- Submit the link to the YouTube video, GitHub repository, and any other materials to: recruitment@rapidious.com

---

## Technical Stack

### Backend
- **Python Version**: 3.11.5
- **Django Version**: 5.1.1
- **Required Packages**:
  - Django
  - Django REST Framework
  - Django CORS Headers
  - Python Dotenv
  - OpenSearch-Py
  - Pillow
  - Django Use Email as Username

### Frontend
- **Node Version**: v20.12.2
- **NPM Version**: 10.8.3
- **React Version**: ^18.3.1
- **Required Packages**:
  - Tailwind CSS
  - Axios
  - React Router DOM
  - Formik
  - Yup
  - React Toastify
  - FontAwesome Icons

---

## OpenSearch Data Indexing

### Setup Instructions

1. **OpenSearch Connection Details**:
   - Host: `localhost`
   - Port: `9200`
   - Auth: (`admin`, `Str0ngP@ssw0rd!2024`)
   - SSL: False

2. **Create Index and Ingest Data**:
   ```python
   import json
   from opensearchpy import OpenSearch, helpers

   # OpenSearch connection details
   host = 'localhost'
   port = 9200
   auth = ('admin', 'Str0ngP@ssw0rd!2024')

   # Create the client instance
   client = OpenSearch(
       hosts=[{'host': host, 'port': port}],
       http_auth=auth
   )

   # Index name
   index_name = 'epirecipesdataset'

   # Create the index with mapping if it doesn't exist
   if not client.indices.exists(index=index_name):
       mapping = {
           "mappings": {
               "properties": {
                   "title": {"type": "text", "analyzer": "standard"},
                   "ingredients": {"type": "text"},
                   "directions": {"type": "text"},
                   "calories": {"type": "float"},
                   "protein": {"type": "float"},
                   "fat": {"type": "float"},
                   "date": {"type": "date"},
                   "categories": {"type": "keyword"}
               }
           }
       }
       client.indices.create(index=index_name, body=mapping)

   # Load JSON data
   with open('full_format_recipes.json', 'r') as file:
       data = json.load(file)

   # Prepare the documents for bulk indexing
   def generate_documents():
       for i, item in enumerate(data):
           yield {
               "_index": index_name,
               "_id": str(i),
               "_source": item
           }

   # Perform bulk indexing
   print("Uploading documents to OpenSearch...")
   success, failed = helpers.bulk(client, generate_documents(), stats_only=True)

   print(f"Successfully indexed {success} documents.")
   print(f"Failed to index {failed} documents.")

   # Refresh the index to make the documents searchable immediately
   client.indices.refresh(index=index_name)
