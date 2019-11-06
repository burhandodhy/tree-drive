from rest_framework.routers import DefaultRouter;
from api import views
from django.urls import path, include


router = DefaultRouter()
router.register('user', views.UserViewSet) 

urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.LoginAPI.as_view())
]
