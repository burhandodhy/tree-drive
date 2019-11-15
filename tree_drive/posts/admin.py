from django.contrib import admin
from posts.models import Post, Gallery


class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 1
    verbose_name_plural = 'Gallery'


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')
    search_fields = ('title', 'content')
    save_as = True
    exclude = ('slug',)
    inlines = [
        GalleryInline,
    ]

admin.site.register(Post, PostAdmin)
