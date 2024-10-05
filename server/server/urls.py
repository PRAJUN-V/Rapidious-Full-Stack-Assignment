from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('test_app.urls')),
    path('opensearch/', include('opensearch_util.urls'))
]
