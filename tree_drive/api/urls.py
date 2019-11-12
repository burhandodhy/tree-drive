from rest_framework.routers import DefaultRouter;
from api import views
from django.urls import path, include
from knox import views as know_views

router = DefaultRouter()
router.register('user', views.UserViewSet) 

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginAPI.as_view()),
    path('logout/', know_views.LogoutView.as_view(), name='know_logout'),
    path('user-data/', views.UserDataAPI.as_view()),
]
