from opensearchpy import OpenSearch

# Replace with your OpenSearch endpoint and credentials
host = 'http://localhost:9200'
username = 'admin'
password = "Str0ngP@ssw0rd!2024"

# Connect to OpenSearch
client = OpenSearch(
    hosts=[host],
    http_auth=(username, password),
    use_ssl=False,
    verify_certs=False
)

# Define the index name
index_name = 'epirecipesdata'  # Replace with your index name

# Word to search in the title
search_word = "Egg"  # Replace with the word you want to search for

# Search for documents with the specified word in the title
try:
    response = client.search(
        index=index_name,
        body={
            "query": {
                "match": {
                    "title": search_word  # Search in the title field
                }
            },
            "size": 10  # Number of documents to return
        }
    )
    
    # Check if we got any documents and print them
    if response['hits']['hits']:
        print(f"Documents containing '{search_word}' in the title:")
        for hit in response['hits']['hits']:
            print(hit['_source'])
    else:
        print(f"No documents found with '{search_word}' in the title.")
except Exception as e:
    print(f"Error retrieving documents: {e}")
