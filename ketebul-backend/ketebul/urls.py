from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import ArtistViewSet, BookViewSet, PostViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponseRedirect

# Step 1: Set up the API router first
router = DefaultRouter()
router.register(r'artists', ArtistViewSet)
router.register(r'books', BookViewSet)
router.register(r'posts', PostViewSet)

# Redirect root (/) to frontend
def redirect_to_frontend(request):
    return HttpResponseRedirect("http://localhost:3000/")

# Step 2: Define urlpatterns before modifying it
urlpatterns = [
    path('', redirect_to_frontend),  # 👈 Redirect root to frontend
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Step 3: Append media files serving only in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
