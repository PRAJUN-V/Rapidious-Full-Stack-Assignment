from django.urls import path, include
from .views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomTokenObtainPairView, UserStatusView

urlpatterns = [
    path('api/account/register/', CreateUserView.as_view(), name='register'),
    path('api/account/token/', CustomTokenObtainPairView.as_view(), name="get_token"),
    path('api/account/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/account/user-status/', UserStatusView.as_view(), name='user-status'),
]