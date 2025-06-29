from django.urls import path, include
from .views import RegisterView, CustomTokenObtainPairView, OrderCreateView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('products', views.ProductViewSet, basename='product')

urlpatterns = [
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/orders/', OrderCreateView.as_view(), name='order-create'),
    path('api/', include(router.urls)),
    
]