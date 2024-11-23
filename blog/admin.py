from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'source')  # Les champs à afficher dans la liste des articles
    search_fields = ('title', 'content')  # Permet de rechercher dans le titre et le contenu
    list_filter = ('source',)  # Permet de filtrer par source

# Enregistrer le modèle Section dans l'admin
@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('main_title', 'section_title', 'section_content')  # Afficher les sections avec leur contenu
    search_fields = ('section_title', 'section_content')  # Permet de rechercher dans le titre et le contenu des sections
    list_filter = ('main_title',)  # Permet de filtrer par le titre principal de l'article