from django.contrib import admin
from .models import Artist, Book, Post, ContactMessage

admin.site.register(Artist)
admin.site.register(Book)
admin.site.register(Post)
admin.site.register(ContactMessage)
