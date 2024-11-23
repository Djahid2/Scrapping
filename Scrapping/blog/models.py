from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)  
    content = models.TextField()      
    source = models.CharField(max_length=600)


    def __str__(self):
        return self.title  # Représentation en texte
    
class Section(models.Model):
    main_title = models.ForeignKey(Article, related_name='sections', on_delete=models.CASCADE)
    section_title = models.CharField(max_length=255)  # Sous-titre (h3)
    section_content = models.TextField()              # Contenu du sous-titre

    def __str__(self):
        return f"{self.main_title.title} - {self.section_title}"