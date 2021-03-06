from rest_framework import viewsets
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from api.serializers import UserSerializer, LoginSerializer
from authenticate.models import CustomUser
from api.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import renderers
from knox.models import AuthToken
from rest_framework import permissions
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    http_method_names = ['patch', 'post']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response_data = {
            "user": serializer.data,
            "token": AuthToken.objects.create(CustomUser.objects.get(id=serializer.data['id']))[1]
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

# Login API
class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User Data API
class UserDataAPI(RetrieveAPIView):
  permission_classes = [
      permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
