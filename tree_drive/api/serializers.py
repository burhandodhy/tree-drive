from rest_framework import serializers
from authenticate.models import CustomUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
  
  email = serializers.EmailField(required=True)

  class Meta:
    model = CustomUser
    fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'address', 'city', 'country', 'zip_code']
    extra_kwargs = {'password': {'write_only': True}}


  def validate_email(self, value):

      if self.context['request'].method == 'POST' and CustomUser.objects.filter(email=value).exists():
        raise serializers.ValidationError("Email already exists")

      if self.context['request'].method == 'PATCH':
        if value != self.context['request'].user.email and CustomUser.objects.filter(email=value).exists():
          raise serializers.ValidationError("Email already exists")

      return value

  def create(self, validated_data):	
    username = validated_data.get('username')	
    email = validated_data.get('email')	
    password = validated_data.get('password')	
    first_name = validated_data.get('first_name')	
    last_name = validated_data.get('last_name')	
    address = validated_data.get('address')	
    city = validated_data.get('city')	
    country = validated_data.get('country')	
    zip_code = validated_data.get('zip_code')

    user = CustomUser.objects.create_user(	
        username=username, password=password, email=email, first_name=first_name, last_name=last_name, address=address, city=city, country=country, zip_code=zip_code)
    return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
