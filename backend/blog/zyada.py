import sys
import os
import django

# Add the backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Setup Django
django.setup()

from googletrans import Translator
from datetime import date
from bs4 import BeautifulSoup
import requests
from blog.models import Article, Section  # Ensure the models are imported correctly

session = requests.Session()
url_site1 = 'https://www.datarockstars.ai/la-societe-generale-utilise-le-machine-learning-pour-prevenir-des-fraudes-bancaires/'
response = session.get(url_site1)

def translate_to_english(text):
    if text:
        translator = Translator()
        translation = translator.translate(text, src='fr', dest='en')
        """
        translator = Translator(provider='mymemory', from_lang='fr', to_lang='en')
        translation = translator.translate(text)
        """
        if translation.text:
            return translation.text
    return text

if response.status_code == 200:
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    elements = soup.find('div', {'data-id': '27be59d5'})
    elements_text = elements.find('div', class_='elementor-widget-container')

    def scrap():
        result = []

        current_title = None
        current_content = []
        # Parcourir tous les éléments dans la div `blog-text`
        for element in elements_text.children:
            # Vérifier si l'élément est un h2 (titre principal)
            print(element.name)
            if element.name == 'h2':
                if current_title:  # Si on a déjà un titre précédent, on l'ajoute à la liste
                    result.append({'title': current_title, 'content': current_content})

                # Mettre à jour le titre principal et réinitialiser les autres variables
                current_title = translate_to_english(element.get_text(strip=True))
                current_content = []  # Réinitialiser le contenu du titre principal

            else:
                # Ajouter le contenu sous le titre principal si nécessaire
                if current_title:
                    current_content.append(translate_to_english(element.get_text(strip=True)))
                # Ajouter le contenu sous un sous-titre

        # Ajouter le dernier titre et ses sous-titres à la liste de résultats
        if current_title:
            result.append({'title': current_title, 'content': current_content})

        # Afficher ou traiter les résultats
        for section in result:
            # Vérifier si l'article existe déjà dans la base de données
            article_title = section['title']
            article_content = ' '.join(section['content'])  # Joindre le contenu de l'article

            article, created = Article.objects.get_or_create(
                title=article_title,  # Critère de recherche par le titre
                source=url_site1,  # Critère de recherche par la source
                defaults={
                    'content': article_content,
                    'Scrapping_date': date.today()  # Valeur par défaut pour Scrapping_date
                }
            )

            if not created:
                # Si l'article existe déjà, mettre à jour son contenu si nécessaire
                article.content = article_content
                article.save()
                print("nothing to scrap")
            else:
                print("new article add")

        return result

    result = scrap()

    # Affichage ou autres traitements
    for section in result:
        print(f"Title: {section['title']}")
        print(f"Content: {' '.join(section['content'])}")

else:
    print(f"Erreur de requête : {response.status_code}")