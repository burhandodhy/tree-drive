from rest_framework import serializers
from posts.models import Post
from django.template.defaultfilters import slugify

class PostSerialize(serializers.ModelSerializer):
  
  created_on = serializers.DateTimeField(format='%Y-%m-%d')
  author = serializers.ReadOnlyField(source='author.username',)
  
  class Meta:
    model = Post
    fields = '__all__'
    extra_kwargs = {'slug': {'read_only': True}}


  def create(self, validated_data):
    obj = Post.objects.create(**validated_data)
    obj.slug = slugify(obj.title)
    obj.save()
    return obj
