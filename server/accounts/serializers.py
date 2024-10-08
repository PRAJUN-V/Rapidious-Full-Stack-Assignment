from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Profile

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["role", "image"]

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ["id", "password", "email", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # Create the user
        user = User.objects.create_user(**validated_data)
        # Create or update the profile
        if profile_data:
            Profile.objects.update_or_create(user=user, defaults=profile_data)
        
        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add specific claims to the token
        token['id'] = user.id
        token['role'] = user.profile.role
        token['is_active'] = user.is_active

        return token
    
class UserStatusSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ["is_active", "profile"]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["role", "image"]

class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer(required=False)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "password", "profile"]

    def update(self, instance, validated_data):
        # Update user's first and last names
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        # Update password if provided
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()

        # Update or create profile data if provided
        profile_data = validated_data.get('profile', None)
        if profile_data:
            Profile.objects.update_or_create(user=instance, defaults=profile_data)

        return instance
    

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class ProfileUpdateSerializer(serializers.ModelSerializer):
    user = UserProfileUpdateSerializer()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'image', 'role']

    def update(self, instance, validated_data):
        print("Validated data received:", validated_data)  # Log validated data
        user_data = validated_data.pop('user', {})
        print("User data extracted:", user_data)  # Log user data after popping
        user = instance.user
        
        print("User before update:", user)  # Log the user before updating
        # Update User model fields
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update Profile model fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()  # Ensure the profile instance is saved

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_representation = representation.pop('user')
        representation.update(user_representation)  # Simplified to update representation directly
        return representation