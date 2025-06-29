from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model
from django.db import models
import json

class UserManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError('The Phone field must be set')
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):
    phone = models.CharField(max_length=20, unique=True)
    email = None
    username = None 
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = [] 
    objects = UserManager() 
    
    class Meta:
        db_table = 'custom_users'

    def __str__(self):
        return self.phone
    

    

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('T-shirts', 'Футболки'),
        ('Robe', 'Мантии'),
        ('Dress', 'Платья'),
        ('Accessories', 'Аксессуары'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Название")
    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="Цена"
    )
    sizes = models.CharField(max_length=50, verbose_name="Доступные размеры")
    image = models.ImageField(
        upload_to='products/',
        verbose_name="Изображение WEBP"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name="Категория"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




User = get_user_model()

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    items = models.JSONField()
    shipping_address = models.JSONField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.get_status_display()}"

    def get_items_list(self):
        try:
            return json.loads(self.items)
        except (TypeError, json.JSONDecodeError):
            return []

    def get_shipping_address(self):
        try:
            return json.loads(self.shipping_address)
        except (TypeError, json.JSONDecodeError):
            return {}