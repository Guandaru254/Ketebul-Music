from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, BookViewSet, PostViewSet

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artist')
router.register(r'books', BookViewSet, basename='book')
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('api/', include(router.urls)),
]
