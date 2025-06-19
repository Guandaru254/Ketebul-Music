from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField()
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='artists/', null=True, blank=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    cover = models.ImageField(upload_to='books/')
    description = models.TextField()
    download_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
