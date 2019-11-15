from django.db import models
from django.utils.translation import gettext as _
from authenticate.models import CustomUser
from django.template.defaultfilters import slugify
from model_utils.models import TimeStampedModel


class Post(TimeStampedModel):
  author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, )
  slug = models.CharField(_('Slug'), max_length=50, unique=True)
  title = models.CharField(_('Title'), max_length=50)
  content = models.TextField(_('Content'))
  feature_image = models.ImageField(_('Feature Image'))
  up_vote = models.IntegerField(_('Up Vote'), default='0')
  down_vote = models.IntegerField(_('Down Vote'), default='0')
  # created_on = models.DateTimeField(_('Created On'), auto_now_add=True)
  # updated_on = models.DateTimeField(_('Updated On '), auto_now=True)

  def __str__(self):
    return self.title

  def save(self, *args, **kwargs):
    self.slug = slugify(self.title)
    super().save(*args, **kwargs)


class Gallery(models.Model):
  post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, related_name='gallery')
  image = models.ImageField(_('Image'))
 
