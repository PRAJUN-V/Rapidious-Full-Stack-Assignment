from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, UserStatusSerializer, UserUpdateSerializer, ProfileUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework import status
from django.http import Http404

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserStatusSerializer(user)
        return Response(serializer.data)
    
class UserUpdateView(generics.GenericAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Get the user by the id from the URL, or raise a 404 error if not found
        user_id = self.kwargs.get('id')
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404("User not found.")

    def patch(self, request, *args, **kwargs):
        # Get the user object by id
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        
        # Validate and update the user data
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        # Get the user object by id
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        # Log incoming data
        print("Incoming data:", request.data)  # Log the raw request data

        # Extract user data
        user_first_name = request.data.get('user[first_name]')
        user_last_name = request.data.get('user[last_name]')
        user = instance.user

        # Update user fields directly
        if user_first_name:
            user.first_name = user_first_name
        if user_last_name:
            user.last_name = user_last_name
        user.save()  # Save the updated user

        # Update profile fields
        for attr, value in request.data.items():
            if attr not in ['user[first_name]', 'user[last_name]']:  # Ensure not to overwrite the user data again
                setattr(instance, attr, value)
        instance.save()  # Save the updated profile

        # Return the updated profile data
        return Response(ProfileUpdateSerializer(instance).data)