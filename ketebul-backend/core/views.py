from rest_framework import viewsets
from .models import Artist, Book, Post
from .serializers import ArtistSerializer, BookSerializer, PostSerializer

class ArtistViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer

    def get_serializer_context(self):
        return {'request': self.request}
