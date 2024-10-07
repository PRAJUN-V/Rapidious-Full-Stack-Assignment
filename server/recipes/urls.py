from django.urls import path
from .views import search_recipes, get_recipes_by_category, search_and_filter_recipes

urlpatterns = [
    path('search/', search_recipes, name='search_recipes'),
    path('category/', get_recipes_by_category, name='get_recipes_by_category'),
    path('search-and-filter/', search_and_filter_recipes, name='search_and_filter_recipes'),
]
