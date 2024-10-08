from django.http import JsonResponse
from opensearchpy import OpenSearch
import os
from dotenv import load_dotenv

load_dotenv()

OPENSEARCH_USERNAME = os.getenv('OPENSEARCH_USERNAME')
OPENSEARCH_PASSWORD = os.getenv('OPENSEARCH_PASSWORD')

client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],  # Use separate host and port
    http_auth=(OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD),
    use_ssl=False
)

def search_recipes(request):
    query = request.GET.get('query', '')
    filter = request.GET.get('filter', '')
    size = int(request.GET.get('size', 10))  # Get the number of results to return, default to 10
    page = int(request.GET.get('page', 1))  # Get the page number, default to 1

    # Calculate the starting point for pagination
    from_ = (page - 1) * size  # Calculate the 'from' value for pagination

    body = {
        "query": {
            "bool": {
                "must": [
                    {"match": {"title": query}}  # or other fields you want to search
                ],
                "filter": []
            }
        },
        "size": size,  # Set the size for the number of documents to return
        "from": from_  # Set the starting point for pagination
    }

    if filter:
        body['query']['bool']['filter'].append({"term": {"categories": filter}})

    response = client.search(index='epirecipesdataset', body=body)
    recipes = response['hits']['hits']
    print(len(recipes))
    return JsonResponse(recipes, safe=False)

def get_recipes_by_category(request):
    category = request.GET.get('category', '')  # Get the category from the query parameters
    size = int(request.GET.get('size', 10))  # Get the number of results to return, default to 10
    page = int(request.GET.get('page', 1))  # Get the page number, default to 1

    # Calculate the starting point for pagination
    from_ = (page - 1) * size  # Calculate the 'from' value for pagination

    # Prepare the search body to filter by category
    body = {
        "query": {
            "bool": {
                "must": [
                    {"term": {"categories": category}}  # Filtering by category
                ]
            }
        },
        "size": size,  # Set the size for the number of documents to return
        "from": from_  # Set the starting point for pagination
    }

    # Perform the search
    response = client.search(index='epirecipesdataset', body=body)
    recipes = response['hits']['hits']
    print(len(recipes))
    
    # Return the recipes as JSON response
    return JsonResponse(recipes, safe=False)

def search_and_filter_recipes(request):
    query = request.GET.get('query', '')
    filters = request.GET.get('filters', '').split(',')
    size = int(request.GET.get('size', 10))
    page = int(request.GET.get('page', 1))

    from_ = (page - 1) * size

    body = {
        "query": {
            "bool": {
                "must": [],
                "filter": []
            }
        },
        "size": size,
        "from": from_
    }

    # Add search query if provided
    if query:
        body["query"]["bool"]["must"].append({
            "multi_match": {
                "query": query,
                "fields": ["title", "desc", "ingredients"]
            }
        })

    # Add filters if provided
    if filters and filters[0]:  # Check if filters is not an empty list
        filter_query = {
            "bool": {
                "must": [{"term": {"categories": filter_item}} for filter_item in filters]
            }
        }
        body["query"]["bool"]["filter"].append(filter_query)

    # If no query and no filters, match all documents
    if not query and not filters[0]:
        body["query"] = {"match_all": {}}

    response = client.search(index='epirecipesdataset', body=body)
    recipes = response['hits']['hits']
    total_hits = response['hits']['total']['value']

    result = {
        "total": total_hits,  
        "page": page,
        "size": size,
        "recipes": recipes
    }

    return JsonResponse(result)

def get_best_rated_recipes(request):
    size = 10  # Limit to 10 recipes

    body = {
        "query": {
            "match_all": {}
        },
        "sort": [
            {"rating": {"order": "desc"}}
        ],
        "size": size
    }

    response = client.search(index='epirecipesdataset', body=body)
    recipes = response['hits']['hits']
    total_hits = response['hits']['total']['value']

    result = {
        "total": total_hits,
        "recipes": recipes
    }

    return JsonResponse(result)
