import os
from opensearchpy import OpenSearch, RequestsHttpConnection
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load OpenSearch credentials from environment variables
username = os.getenv('OPENSEARCH_USERNAME')
password = os.getenv('OPENSEARCH_PASSWORD')

# Create OpenSearch client
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=(username, password),
    use_ssl=False,
    verify_certs=False,
    connection_class=RequestsHttpConnection
)

def retrieve_all_documents(index_name):
    """
    Retrieve all documents from the specified OpenSearch index.

    Parameters:
    index_name (str): The name of the OpenSearch index.

    Returns:
    list: A list of documents.
    """
    response = client.search(index=index_name, body={"query": {"match_all": {}}})
    return response['hits']['hits']

def filter_by_title(index_name, title):
    """
    Filter documents by title.

    Parameters:
    index_name (str): The name of the OpenSearch index.
    title (str): The title to filter by.

    Returns:
    list: A list of filtered documents.
    """
    query = {
        "query": {
            "match": {
                "title": title
            }
        }
    }
    response = client.search(index=index_name, body=query)
    return response['hits']['hits']

def filter_by_calories_range(index_name, min_calories, max_calories):
    """
    Filter documents by a range of calories.

    Parameters:
    index_name (str): The name of the OpenSearch index.
    min_calories (int): Minimum calories.
    max_calories (int): Maximum calories.

    Returns:
    list: A list of filtered documents.
    """
    query = {
        "query": {
            "range": {
                "calories": {
                    "gte": min_calories,
                    "lte": max_calories
                }
            }
        }
    }
    response = client.search(index=index_name, body=query)
    return response['hits']['hits']

def search_by_keyword(index_name, keyword):
    """
    Perform a full-text search by keyword.

    Parameters:
    index_name (str): The name of the OpenSearch index.
    keyword (str): The keyword to search for.

    Returns:
    list: A list of documents matching the keyword.
    """
    query = {
        "query": {
            "match": {
                "description": keyword  # Replace 'description' with your actual field name
            }
        }
    }
    response = client.search(index=index_name, body=query)
    return response['hits']['hits']

def complex_query(index_name, title, min_calories, max_calories):
    """
    Perform a complex query with title and calories range.

    Parameters:
    index_name (str): The name of the OpenSearch index.
    title (str): The title to match.
    min_calories (int): Minimum calories.
    max_calories (int): Maximum calories.

    Returns:
    list: A list of documents matching the criteria.
    """
    query = {
        "query": {
            "bool": {
                "must": [
                    {"match": {"title": title}},
                    {
                        "range": {
                            "calories": {
                                "gte": min_calories,
                                "lte": max_calories
                            }
                        }
                    }
                ]
            }
        }
    }
    response = client.search(index=index_name, body=query)
    return response['hits']['hits']

def retrieve_documents(index_name, size=100, from_doc=0):
    """
    Retrieve documents from OpenSearch.

    Parameters:
    index_name (str): The name of the OpenSearch index.
    size (int): Number of documents to retrieve.
    from_doc (int): The starting point for retrieval (for pagination).

    Returns:
    list: A list of retrieved documents.
    """
    response = client.search(
        index=index_name,
        body={
            "query": {
                "match_all": {}
            },
            "size": size,  # Number of documents to return
            "from": from_doc  # Starting from this document
        }
    )
    
    total_documents = response['hits']['total']['value']
    documents = response['hits']['hits']
    
    print(f"Total documents retrieved: {total_documents}")
    
    for doc in documents:
        print(doc['_source'])  # Print each document's source data

    return documents

def get_first_document(index_name):
    """
    Retrieve the first document from the specified OpenSearch index.
    
    Parameters:
    index_name (str): The name of the OpenSearch index.
    
    Returns:
    dict: The first document in JSON format, or None if no documents are found.
    """
    try:
        response = client.search(
            index=index_name,
            body={
                "query": {
                    "match_all": {}
                },
                "size": 1  # Limit the results to 1 document
            }
        )
        
        # Check if any hits were found
        if response['hits']['hits']:
            return response['hits']['hits'][0]['_source']  # Get the first document's source
        else:
            print("No documents found.")
            return None
            
    except Exception as e:
        print(f"Error retrieving document: {e}")
        return None
    
def get_document_count(index_name):
    """
    Get the number of documents in a specified OpenSearch index.

    Parameters:
    index_name (str): The name of the OpenSearch index.

    Returns:
    int: The number of documents in the index.
    """
    try:
        response = client.count(index=index_name)
        count = response['count']
        return count
    except Exception as e:
        print(f"Error retrieving document count: {e}")
        return None

# Example usage
if __name__ == "__main__":
    index_name = 'recipes'  # Replace with your index name
    document_count = get_document_count(index_name)
    if document_count is not None:
        print(f"Number of documents in '{index_name}': {document_count}")

# Example usage
if __name__ == "__main__":
    index_name = 'epirecipes'
    
    # # Retrieve the first document
    # first_document = get_first_document(index_name)
    # print("First Document:", first_document)

    # Retrieve all documents
    all_documents = retrieve_all_documents(index_name)
    print(f"Total documents retrieved: {len(all_documents)}")

    # Filter by title
    title_filtered_docs = filter_by_title(index_name, 'Pasta Primavera')
    print(f"Documents with title 'Pasta Primavera': {len(title_filtered_docs)}")

    # Filter by calories range
    calorie_filtered_docs = filter_by_calories_range(index_name, 200, 500)
    print(f"Documents with calories between 200 and 500: {len(calorie_filtered_docs)}")

    # Full-text search by keyword
    keyword_search_results = search_by_keyword(index_name, 'milk')
    print(f"Documents matching keyword 'milk': {len(keyword_search_results)}")

    # Complex query
    complex_query_results = complex_query(index_name, 'Pasta', 200, 500)
    print(f"Documents with title 'Pasta' and calories between 200 and 500: {len(complex_query_results)}")
