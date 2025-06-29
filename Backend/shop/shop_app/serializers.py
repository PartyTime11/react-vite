from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, Order

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User(
            phone=validated_data['phone'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.password = make_password(validated_data['password'])
        user.save()
        return user
    


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['phone'] = user.phone
        return token
    


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None

    class Meta:
        model = Product
        fields = ['id', 'name', 'cost', 'sizes', 'category', 'image_url']




class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'shipping_address', 'total_amount', 'status']
        read_only_fields = ['id', 'user', 'status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate_items(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Items must be a list")
        
        for item in value:
            if not all(field in item for field in ['product_id', 'name', 'price', 'size']):
                raise serializers.ValidationError(
                    "Each item must contain product_id, name, price and size"
                )
            
            if not isinstance(item.get('quantity', 1), int) or item.get('quantity', 1) < 1:
                raise serializers.ValidationError(
                    "Quantity must be a positive integer"
                )
        
        return value

    def validate_shipping_address(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("Shipping address must be a dictionary")
        
        required_fields = ['city', 'street']
        for field in required_fields:
            if field not in value:
                raise serializers.ValidationError(
                    f"Shipping address must contain '{field}' field"
                )
        
        return value

    def validate(self, data):
        data = super().validate(data)
        items = data.get('items', [])
        data['total_amount'] = sum(
            item['price'] * item.get('quantity', 1) for item in items
        )
        
        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['status'] = 'pending'
        return super().create(validated_data)