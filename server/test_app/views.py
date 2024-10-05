from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer