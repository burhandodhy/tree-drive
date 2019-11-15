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

  @action(detail=True, methods=['get'], url_path='up-vote')
  def up_vote(self, request, *args, **kwargs):
    post = self.get_object()
    post.up_vote = post.up_vote + 1
    post.save()
    return Response('upvoted', status.HTTP_200_OK)

  @action(detail=True, methods=['get'], url_path='down-vote')
  def down_vote(self, request, *args, **kwargs):
    post = self.get_object()
    post.down_vote = post.down_vote + 1
    post.save()
    return Response('downvoted', status.HTTP_200_OK)
