# OpenSearch Setup Documentation

## Overview

This document provides a comprehensive guide for setting up OpenSearch, including instructions for creating an index and indexing data from a JSON file.

## Prerequisites

- Ensure you have OpenSearch installed and running locally.
- Install the required Python packages:
  ```bash
  pip install opensearch-py


# OpenSearch connection details
host = 'localhost'  # Use 'localhost' without 'http://'
port = 9200         # Port number should be 9200
auth = ('admin', 'Str0ngP@ssw0rd!2024')  # Replace with your username and password
use_ssl = False  # Set to True if using SSL
verify_certs = False  # Change to True if you have valid certificates


import json
from opensearchpy import OpenSearch, helpers

# Create the client instance
client = OpenSearch(
    hosts=[{'host': host, 'port': port}],
    http_auth=auth,
    use_ssl=use_ssl,
    verify_certs=verify_certs,
)

# Index name
index_name = 'epirecipesdataset'

# Create the index with mapping if it doesn't exist
if not client.indices.exists(index=index_name):
    # Define the mapping for the index
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
        }
    }

    # Create the index with the defined mapping
    client.indices.create(index=index_name, body=mapping)


# Load JSON data
with open('full_format_recipes.json', 'r') as file:
    data = json.load(file)

# Prepare the documents for bulk indexing
def generate_documents():
    for i, item in enumerate(data):
        yield {
            "_index": index_name,
            "_id": str(i),  # Use a unique identifier for each document
            "_source": item
        }

# Perform bulk indexing
print("Uploading documents to OpenSearch...")
success, failed = helpers.bulk(client, generate_documents(), stats_only=True, raise_on_error=False)

print(f"Successfully indexed {success} documents.")
print(f"Failed to index {failed} documents.")

# Refresh the index to make the documents searchable immediately
client.indices.refresh(index=index_name)

print("Upload complete.")


try:
    response = client.count(index=index_name)
    doc_count = response['count']
    print(f"Number of documents in index '{index_name}': {doc_count}")
except Exception as e:
    print(f"Error retrieving document count: {e}")




