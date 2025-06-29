from django.core.management.base import BaseCommand
from shop_app.models import Product
from django.core.files import File
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        media_products_path = os.path.join('media', 'products')
        products_data = [
            {
                'name': 'Harry Potter`s Robe',
                'cost': 2990,
                'sizes': 'S, M, L, XL',
                'category': 'Robe',
                'image_file': 'Grif_robe.webp'
            },
            {
                'name': 'Malfoy`s Robe',
                'cost': 2990,
                'sizes': 'S, M, XL',
                'category': 'Robe',
                'image_file': 'Snake_robe.webp'  
            },
            {
                'name': 'Diggory`s Robe',
                'cost': 2990,
                'sizes': 'S, L, XL',
                'category': 'Robe',
                'image_file': 'Huff_robe.webp'  
            },
            {
                'name': 'Cho Chang`s Robe',
                'cost': 2990,
                'sizes': 'S, M, L',
                'category': 'Robe',
                'image_file': 'Rawen_robe.webp'  
            },



            {
                'name': 'Beige T-shirt',
                'cost': 1090,
                'sizes': 'S, M, L',
                'category': 'T-shirts',
                'image_file': 'Beige.webp'  
            },
            {
                'name': 'Green T-shirt',
                'cost': 1090,
                'sizes': 'S, L',
                'category': 'T-shirts',
                'image_file': 'Green.webp'  
            },
            {
                'name': 'Red T-shirt',
                'cost': 1090,
                'sizes': 'M, L',
                'category': 'T-shirts',
                'image_file': 'Red.webp'  
            },
            {
                'name': 'Blue T-shirt',
                'cost': 1090,
                'sizes': 'S, M, L',
                'category': 'T-shirts',
                'image_file': 'Blue.webp'  
            },


            {
                'name': 'Pink T-shirt',
                'cost': 1090,
                'sizes': 'S, M, L',
                'category': 'T-shirts',
                'image_file': 'Pink_shirt.webp'  
            },


            {
                'name': 'Griffindor T-shirt',
                'cost': 1350,
                'sizes': 'S, M, L',
                'category': 'T-shirts',
                'image_file': 'Griff_07.webp'  
            },
            {
                'name': 'Slytherin T-shirt',
                'cost': 1350,
                'sizes': 'S, L',
                'category': 'T-shirts',
                'image_file': 'Snake_07.webp'  
            },
            {
                'name': 'Hufflepuff T-shirt',
                'cost': 1350,
                'sizes': 'S, M, L',
                'category': 'T-shirts',
                'image_file': 'Huff_07.webp'  
            },
            {
                'name': 'Rawenclaw T-shirt',
                'cost': 1350,
                'sizes': 'M, L',
                'category': 'T-shirts',
                'image_file': 'Rawen_07.webp'  
            },


            {
                'name': 'Pink Dress',
                'cost': 1780,
                'sizes': 'S, M, L',
                'category': 'Dress',
                'image_file': 'Pink_dress.webp'  
            },
            {
                'name': 'Blue Dress',
                'cost': 1780,
                'sizes': 'S, M',
                'category': 'Dress',
                'image_file': 'Blue_dress.webp'  
            },


            {
                'name': 'Gryffindor Scarf',
                'cost': 990,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Griff_scarf.webp'  
            },
            {
                'name': 'Slytherin Scarf',
                'cost': 990,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Snake_scarf.webp'  
            },
            {
                'name': 'Hufflepuff Scarf',
                'cost': 990,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Huff_scarf.webp'  
            },
            {
                'name': 'Rawenclaw Scarf',
                'cost': 990,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Rawen_scarf.webp'  
            },


            {
                'name': 'Blue Bow',
                'cost': 360,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Bow.webp'  
            },
            {
                'name': 'Pen Cake',
                'cost': 250,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Pen.webp'  
            },
                        {
                'name': 'Pendant Cake',
                'cost': 220,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Pendant.webp'  
            },
                        {
                'name': 'Popsocket Cake',
                'cost': 360,
                'sizes': 'One size',
                'category': 'Accessories',
                'image_file': 'Popsocket.webp'  
            },
        ]

        

        for product_data in products_data:
            if not Product.objects.filter(name=product_data['name']).exists():
                product = Product(
                    name=product_data['name'],
                    cost=product_data['cost'],
                    sizes=product_data['sizes'],
                    category=product_data['category']
                )
                image_path = os.path.join(media_products_path, product_data['image_file'])
                
                if os.path.exists(image_path):
                    with open(image_path, 'rb') as f:
                        product.image.save(product_data['image_file'], File(f))
                    self.stdout.write(self.style.SUCCESS(f'Добавлен товар: {product.name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'Изображение не найдено: {image_path}'))
                    continue
                
                product.save()
            else:
                self.stdout.write(self.style.WARNING(f'Товар уже существует: {product_data["name"]}'))

        self.stdout.write(self.style.SUCCESS('Заполнение базы данных завершено'))