import sys
import os
import django

# Add the backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Setup Django
django.setup()

from blog.models import Article, Section  # Ensure the models are imported correctly

from backend.Scarp3 import scrap

# Utilisation de la fonction scrap
result = scrap()
for section in result:
    print(f"Title: {section['title']}")
    print(f"Content: {' '.join(section['content'])}")