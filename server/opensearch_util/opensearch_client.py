from opensearchpy import OpenSearch
from django.conf import settings

class OpenSearchClient:
    def __init__(self):
        self.client = OpenSearch(
            hosts=[{'host': settings.OPENSEARCH_HOST, 'port': settings.OPENSEARCH_PORT}],
            http_auth=(settings.OPENSEARCH_USER, settings.OPENSEARCH_PASSWORD),
            use_ssl=settings.OPENSEARCH_USE_SSL,
            verify_certs=settings.OPENSEARCH_VERIFY_CERTS,
        )

    def create_index(self, index_name, body):
        return self.client.indices.create(index=index_name, body=body)

    def index_document(self, index_name, document, doc_id=None):
        return self.client.index(index=index_name, body=document, id=doc_id, refresh=True)

    def search(self, index_name, query):
        return self.client.search(index=index_name, body=query)

    def delete_document(self, index_name, doc_id):
        return self.client.delete(index=index_name, id=doc_id, refresh=True)

    def update_document(self, index_name, doc_id, update_data):
        return self.client.update(index=index_name, id=doc_id, body={"doc": update_data}, refresh=True)

opensearch_client = OpenSearchClient()