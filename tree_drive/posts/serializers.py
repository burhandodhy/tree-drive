from rest_framework import serializers
from posts.models import Post, Gallery
from django.template.defaultfilters import slugify


class GallerySerializer(serializers.ModelSerializer):

  class Meta:
    model = Gallery
    fields =('image',)
        

class PostSerialize(serializers.ModelSerializer):

    created = serializers.DateTimeField(format='%Y-%m-%d')
    author = serializers.ReadOnlyField(source='author.username',)
    gallery = GallerySerializer(many=True, read_only=True,)

    class Meta:
        model = Post
        fields = ('__all__')
        extra_kwargs = {'slug': {'read_only': True}}
