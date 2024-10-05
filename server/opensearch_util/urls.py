from django.urls import path
from .views import create_document_view, delete_document_view, update_document_view, search_view, get_all_documents_view

urlpatterns = [
    path('api/documents/', create_document_view, name='create_document'),
    path('api/documents/delete/<str:doc_id>/', delete_document_view, name='delete_document'),
    path('api/documents/update/<str:doc_id>/', update_document_view, name='update_document'),
    path('api/search/', search_view, name='search'),
    path('api/all/', get_all_documents_view, name='all'),
]