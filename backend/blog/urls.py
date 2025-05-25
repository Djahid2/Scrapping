from . import views
from django.urls import path

from blog.views import *

urlpatterns = [
    path('', views.accueil, name='accueil'),
    path('articles/',getArticles.as_view(),name="articles"),
    path('thesisdata/',getThesisData.as_view(),name="thesisdata"),    
    path('similarities/', get_article_similarities, name='similarities'),
]