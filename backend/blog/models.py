from django.db import models
from datetime import date
# Create your models here.
class Article(models.Model):
    TYPE_CHOICES = [
        ('news', 'News'),
        ('description', 'Description'),
    ]

    title = models.CharField(max_length=100)
    content = models.TextField()
    source = models.CharField(max_length=600)
    Scrapping_date = models.DateField(default=date.today)
    type = models.CharField(
        max_length=12, 
        choices=TYPE_CHOICES, 
        default='description'
    )

    def __str__(self):
        return self.title
    
class Section(models.Model):
    main_title = models.ForeignKey(Article, related_name='sections', on_delete=models.CASCADE)
    section_title = models.CharField(max_length=255)  # Sous-titre (h3)
    section_content = models.TextField()              # Contenu du sous-titre

    def __str__(self):
        return f"{self.main_title.title} - {self.section_title}"
    
import json
class ThesisData(models.Model):
    titre =  models.CharField(max_length=255,null= True) 
    info = models.JSONField(null=True)  # Utilisation de JSONField pour stocker la matrice d'informations
    Scrap_statique_data =  models.DateField(default=date.today)
    def __str__(self):
        
        return json.dumps(self.info) if self.info else "No data available"