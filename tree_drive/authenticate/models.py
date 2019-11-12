from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _

class CustomUser(AbstractUser):
    address = models.CharField(_('Address'), max_length=50, blank=True)
    country = models.CharField(_('Country'), max_length=50, blank=True)
    city = models.CharField(_('City'), max_length=50, blank=True)
    zip_code = models.CharField(_('Zip Code'), max_length=50, blank=True)
    status = models.BooleanField(_('Status'), default=True)

    class Meta:
        verbose_name = 'User'

