from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('shop_app.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('catalogue/', TemplateView.as_view(template_name='index.html')),
    path('auth/basket/', TemplateView.as_view(template_name='index.html')),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)