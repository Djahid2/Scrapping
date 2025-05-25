import os
import django
from googletrans import Translator
from datetime import date
# Spécifier le module de paramètres de ton projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Initialiser Django
django.setup()


from bs4 import BeautifulSoup
import requests
from blog.models import Article,Section

def translate_to_english(text):
    if text :
        translator = Translator()
        translation = translator.translate(text, src='fr', dest='en')
        """
        translator = Translator(provider='mymemory',from_lang='fr',to_lang='en')
        translation = translator.translate(text)
        """
        if translation.text:
            return translation.text
    return text 


session = requests.Session()
url_site1 = 'https://www.aqsone.com/fr/blog/comment-la-data-science-reinvente-la-detection-de-fraude'
response = session.get(url_site1)

if response.status_code == 200 : 
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    elements = soup.find('div',class_='blog-text')
   
    
    # Parcourir tous les éléments dans la div `blog-text`
    def scrap():
         
        result = []

        current_title = None
        current_content = []
        current_subtitle = None
        for element in elements.children:
            # Vérifier si l'élément est un h2 (titre principal)
            if element.name == 'h2':
                if current_title:  # Si on a déjà un titre précédent, on l'ajoute à la liste
                    result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
                
                # Mettre à jour le titre principal et réinitialiser les autres variables
                current_title = translate_to_english(element.get_text(strip=True))
                current_content = []  # Réinitialiser le contenu du titre principal
                current_subtitle = []  # Réinitialiser les sous-titres
                
            # Vérifier si l'élément est un h3 (sous-titre)
            elif element.name == 'h3':
                # Ajouter le sous-titre au titre principal courant
                if current_title:
                    current_subtitle.append({
                        'subtitle': translate_to_english(element.get_text(strip=True)),
                        'content': []  # Le contenu des sous-titres peut être ajouté plus tard si nécessaire
                    })
            
        
            else :
                # Ajouter le contenu sous le titre principal si nécessaire
                if current_title and not current_subtitle:
                    current_content.append(translate_to_english(element.get_text(strip=True)))
                # Ajouter le contenu sous un sous-titre
                elif current_subtitle:
                    current_subtitle[-1]['content'].append(translate_to_english(element.get_text(strip=True)))
            
        # Ajouter le dernier titre et ses sous-titres à la liste de résultats
        if current_title:
            result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
        
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
            else : 
                print("new article add")
        
        # Ajouter les sous-titres associés à cet article
            for subtitle in section['subtitles']:
                subtitle_title = subtitle['subtitle']
                subtitle_content = ' '.join(subtitle['content'])  # Joindre le contenu du sous-titre
            
            # Vérifier si la section existe déjà
                section_exists = Section.objects.filter(
                    main_title=article, section_title=subtitle_title
                ).exists()
            
                if not section_exists:
                # Si la section n'existe pas, la créer
                    Section.objects.create(
                        main_title=article,  # Associer la section à l'article
                        section_title=subtitle_title,
                        section_content=subtitle_content
                    )
                    print("new section add")
                else:
                # Si la section existe déjà, la mettre à jour (si nécessaire)
                    section_instance = Section.objects.get(
                    main_title=article, section_title=subtitle_title
                    )
                    section_instance.section_content = subtitle_content
                    section_instance.save()
        return result
    result = scrap()
# Affichage ou autres traitements
    for section in result:
        print(f"Title: {section['title']}")
        print(f"Content: {' '.join(section['content'])}")
        for subtitle in section['subtitles']:
            print(f"  Subtitle: {subtitle['subtitle']}")
            print(f"    Content: {', '.join(subtitle['content'])}")
else:
    print(f"Erreur de requête : {response.status_code}")