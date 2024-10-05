from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from opensearchpy import OpenSearch
import json

# Connect to OpenSearch
host = 'http://localhost:9200'
username = 'admin'  # Replace with your OpenSearch username
password = 'admin'  # Replace with your OpenSearch password
client = OpenSearch(
    host,
    http_auth=(username, password),
)

# Specify the index name
index_name = 'indexname1'

@csrf_exempt
def create_document_view(request):
    if request.method == 'POST':
        try:
            # Parse JSON from request body
            document = json.loads(request.body)

            # Index the document in OpenSearch
            result = client.index(index=index_name, body=document)
            return JsonResponse({"message": "Document added", "id": result['_id']})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def delete_document_view(request, doc_id):
    if request.method == 'DELETE':
        try:
            # Delete the document by ID
            response = client.delete(index=index_name, id=doc_id)
            return JsonResponse({"message": "Document deleted", "result": response['result']})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def update_document_view(request, doc_id):
    if request.method == 'PUT':
        try:
            # Parse JSON from request body
            document = json.loads(request.body)

            # Update the document in OpenSearch
            response = client.update(index=index_name, id=doc_id, body={"doc": document})
            return JsonResponse({"message": "Document updated", "result": response['result']})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)


def search_view(request):
    query = request.GET.get('q', '')  # Get search query from URL parameter
    if not query:  # If no query is provided, return an error
        return JsonResponse({"error": "No search query provided"}, status=400)

    # Construct a multi-match query to search across multiple fields
    search_body = {
        'query': {
            'multi_match': {
                'query': query,  # The search term
                'fields': ['title', 'ingredients']  # Fields to search in (add others as necessary)
            }
        }
    }

    try:
        # Perform the search on the specified index
        results = client.search(index=index_name, body=search_body)

        # Process the results
        hits = results['hits']['hits']
        processed_results = [hit['_source'] for hit in hits]

        return JsonResponse(processed_results, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def get_all_documents_view(request):
    if request.method == 'GET':
        try:
            # Search for all documents in the index
            search_body = {
                "query": {
                    "match_all": {}
                }
            }

            results = client.search(index=index_name, body=search_body)

            # Process the results
            hits = results['hits']['hits']
            processed_results = [hit['_source'] for hit in hits]

            return JsonResponse(processed_results, safe=False)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)