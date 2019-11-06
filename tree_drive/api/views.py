from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from api.serializers import UserSerializer, LoginSerializer
from authenticate.models import CustomUser
from api.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import renderers


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    http_method_names = ['get', 'patch', 'post']


# Login API
class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })
