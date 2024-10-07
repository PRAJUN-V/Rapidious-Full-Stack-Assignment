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
index_name = 'epirecipesdataset'  # Replace with your index name

# Retrieve the second document by index position
try:
    response = client.search(
        index=index_name,
        body={
            "query": {
                "match_all": {}
            },
            "size": 1,  # We want only one document
            "from": 10,  # Skip the first document
            "sort": [{"_id": "asc"}]  # Sort by ID to get the second document
        }
    )
    
    # Check if we got any documents and print the second one
    if response['hits']['hits']:
        second_document = response['hits']['hits'][0]['_source']
        print("Second document in the index:")
        print(second_document)
    else:
        print("No documents found in the index.")
except Exception as e:
    print(f"Error retrieving the second document: {e}")
