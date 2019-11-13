from django.db import models
from django.utils.translation import gettext as _
from authenticate.models import CustomUser

class Post(models.Model):
  author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, )
  slug = models.CharField(_('Slug'), max_length=50, unique=True)
  title = models.CharField(_('Title'), max_length=50)
  content = models.TextField(_('Content'))
  feature_image = models.ImageField(_('Feature Image'))
  gallery_image_1 = models.ImageField(_('Gallery Image 1'), null=True)
  gallery_image_2 = models.ImageField(_('Gallery Image 2'), null=True)
  like = models.IntegerField(_('Likes'), default='0')
  dislike = models.IntegerField(_('Dislikes'),default='0')
  created_on = models.DateTimeField(_('Created On'), auto_now_add=True)
  updated_on = models.DateTimeField(_('Updated On '), auto_now=True)

  def __str__(self):
    return self.title
