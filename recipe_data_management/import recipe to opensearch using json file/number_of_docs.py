from opensearchpy import OpenSearch

# Replace with your OpenSearch endpoint, and credentials
host = 'http://localhost:9200'  # Use http instead of https
username = 'admin'
password = "Str0ngP@ssw0rd!2024"

# Connect to OpenSearch without SSL
client = OpenSearch(
    hosts=[host],
    http_auth=(username, password),
    use_ssl=False,  # Disable SSL since it's not required on localhost
    verify_certs=False
)

# Define the index name
index_name = 'epirecipesdata'  # Replace with your index name

# Use the count API to retrieve the document count
try:
    response = client.count(index=index_name)
    doc_count = response['count']
    print(f"Number of documents in index '{index_name}': {doc_count}")
except Exception as e:
    print(f"Error retrieving document count: {e}")
