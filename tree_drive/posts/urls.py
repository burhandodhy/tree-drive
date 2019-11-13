from rest_framework.routers import DefaultRouter
from posts import views
from django.urls import path, include

router = DefaultRouter()
router.register('post', views.PostViewSet)

urlpatterns = [
    path("", include(router.urls)), 
    path('api-auth/', include('rest_framework.urls')),
]
