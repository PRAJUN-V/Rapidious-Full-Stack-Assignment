import pandas as pd
import os
from opensearchpy import OpenSearch, RequestsHttpConnection
from dotenv import load_dotenv
import time

# Load environment variables from .env file
load_dotenv()

# Load the recipe data from a CSV file
df = pd.read_csv('recipes.csv')

def transform_data_to_json(df):
    """
    Transform a DataFrame into a list of dictionaries for OpenSearch indexing.

    Parameters:
    df (DataFrame): The input DataFrame containing recipe data.

    Returns:
    list: A list of dictionaries, each representing a recipe.
    """
    json_data = []
    
    for index, row in df.iterrows():
        recipe = {
            "title": row['title'],
            "rating": row['rating'] if not pd.isnull(row['rating']) else None,
            "calories": row['calories'] if not pd.isnull(row['calories']) else None,
            "protein": row['protein'] if not pd.isnull(row['protein']) else None,
            "fat": row['fat'] if not pd.isnull(row['fat']) else None,
            "sodium": row['sodium'] if not pd.isnull(row['sodium']) else None
        }
        
        # Add flags to the recipe dictionary
        for flag in df.columns[6:]:  # Assuming flags start from the 6th column
            recipe[flag] = int(row[flag]) if not pd.isnull(row[flag]) else 0
            
        json_data.append(recipe)
    
    return json_data

# Transform the DataFrame into JSON-compatible format
recipes_json = transform_data_to_json(df)

# Load OpenSearch credentials from environment variables
username = os.getenv('OPENSEARCH_USERNAME')
password = os.getenv('OPENSEARCH_PASSWORD')

client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=(username, password),  # Authentication credentials
    use_ssl=False,  # Set to True if SSL is enabled
    verify_certs=False,  # Set to True to verify SSL certificates
    connection_class=RequestsHttpConnection
)

def index_data_to_opensearch(data, index_name):
    """
    Index data into OpenSearch.

    Parameters:
    data (list): The list of recipe dictionaries to index.
    index_name (str): The name of the OpenSearch index.
    """
    for recipe in data:
        # Generate a unique ID for the recipe
        recipe_id = recipe.get("title", "unknown_title")  # Use title as ID; fallback to a default
        response = {}
        
        try:
            response = client.index(index=index_name, id=recipe_id, body=recipe)
            print(f"Indexed recipe '{recipe_id}': {response}")  # Debugging output
        except Exception as e:
            print(f"Failed to index recipe '{recipe_id}': {e}")
            raise  # Stop the process by raising the exception

# Start the timer
start_time = time.time()

# Call the function to index the transformed data
index_data_to_opensearch(recipes_json, 'epirecipes')

# Calculate elapsed time
elapsed_time = time.time() - start_time
print(f"Indexing completed in {elapsed_time:.2f} seconds.")
