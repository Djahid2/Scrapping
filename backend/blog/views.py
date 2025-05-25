from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from django.shortcuts import get_object_or_404,get_list_or_404
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import *
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_str
from rest_framework.decorators import api_view

def accueil(request):
    return HttpResponse("Bienvenue")


class getArticles(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class getThesisData(generics.ListAPIView):
    queryset = ThesisData.objects.all()
    serializer_class = ThesisDataSerializer


import spacy
from spacy.lang.en.stop_words import STOP_WORDS

nlp = spacy.load('en_core_web_md')

def calculate_similarity(article, title, query):
    doc_article = nlp(article)
    doc_title = nlp(title)
    doc_query = nlp(query)
    
    # Calculate similarity with the article
    similarity_article = doc_article.similarity(doc_query)
    
    # Calculate similarity with the title
    similarity_title = doc_title.similarity(doc_query)
    
    # Return both similarities as a tuple or dictionary
    return similarity_article, similarity_title


# Vue pour calculer les similarités des articles
@api_view(['GET'])
def get_article_similarities(request):
    query = request.GET.get('query', '')
    if nlp is None:
        return JsonResponse({"error": "Le modèle SpaCy n'est pas chargé."}, status=500)

    articles = Article.objects.all()
    similarities = []

    for article in articles:
        similarity_article, similarity_title = calculate_similarity(
            article.content, article.title, query
        )
        if similarity_article > 0.5:
            similarities.append({
                "id": article.id,
                "title": article.title,
                "content": article.content,
                "similarity_with_content": similarity_article,
                "similarity_with_title": similarity_title
            })

    # Trier les articles par similarité avec le contenu
    similarities = sorted(similarities, key=lambda x: x['similarity_with_title'], reverse=True)

    return JsonResponse(similarities, safe=False)



# Example usage
article = "The Société Générale information systems security program aims as well as the implementation of innovative and intelligent devices capable of detecting 'fraudulent' events, as well as strengthening of information leakage control devices.This implies a certain number of challenges: Set up a transverse security tool capable of bringing together and exploiting multi-channel data and allowing to have a global anti-fraud control strategy: a solution that targets all aspects of the bank (online banking, monetic, etc..) And no longer a single channel at the same time. Get an ethical practice of Dumachine Learning techniques: first of all, ensure transparent implementation and great vigilance in the use of customer data, to guarantee the regularity of theBank vis-à-vis regulations (Data Protection Act, European Regulation for the Protection of Personal Data ORGPD).Then preserve its brand image and your relationship of trust with customers. Avoid as much as possible the false positives which can even appear to the implementation of Demaine Learning systems. Lamachine Learning in the way of banks always aims to avoid embarrassment customers.To get there easily, the SG has opted for the implementation of close collaboration between teams in Scienceetbig datad’s part, and customer responsibilities on the other.The bank also endeavored to further promote the profiles given by Lesdata Scientists and mainly orient itself towards reactivity. Do you want to train Aubig Data?Find the training in Full Stacketdata Analyst which forms you in the professions in analyst, data scientist, data engineereta scientist. Thank you for your reading!If you want to read our next articles to data and AI, you can follow us on surfacebook, Linkedinetwitterpour to be notified when a new article is published!"
title = "Machine Learning Anti-Fraude: the challenges for SG"
query = "machine learning"
similarity_article, similarity_title = calculate_similarity(article, title, query)
print(f"Similarity with article: {similarity_article} and similarity with title {similarity_title}")

#Similarity article: 0.6440533963289828
#Similarity title: 0.49989569054843513"""