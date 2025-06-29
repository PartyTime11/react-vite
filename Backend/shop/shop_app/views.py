from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product, Order
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import ProductSerializer, UserRegisterSerializer, CustomTokenObtainPairSerializer, OrderSerializer

@permission_classes([AllowAny])
class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully',
                'user_id': user.id,
                'phone': user.phone
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:

            phone = request.data.get('phone')
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user = User.objects.get(phone=phone)

            response.data.update({
                'user_id': user.id,
                'phone': user.phone
            })
        return response
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    def get_serializer_context(self):
        return {'request': self.request}


@method_decorator(csrf_exempt, name='dispatch')
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("Incoming request data:", request.data)
        print("Authenticated user:", request.user)
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({
                'status': 'success',
                'order_id': serializer.instance.id,
                'message': 'Order created successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'status': 'error',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

        