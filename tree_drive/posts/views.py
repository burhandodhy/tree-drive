from django.shortcuts import render
from rest_framework import viewsets
from posts.serializers import PostSerialize
from posts.models import Post
from posts.pagination import PostLimittOffsetPagination,PostPageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class PostViewSet(viewsets.ModelViewSet):

  serializer_class = PostSerialize
  queryset = Post.objects.all() 
  pagination_class = PostPageNumberPagination
  http_method_names = ['get']

  @action(detail=True, methods=['get'])
  def like(self, request, *args, **kwargs):
    post = self.get_object()
    post.like = post.like + 1
    post.save()
    return Response('liked', status.HTTP_200_OK)

  @action(detail=True, methods=['get'])
  def dislike(self, request, *args, **kwargs):
    post = self.get_object()
    post.dislike = post.dislike + 1
    post.save()
    return Response('disliked', status.HTTP_200_OK)
