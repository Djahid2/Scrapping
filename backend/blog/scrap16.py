import sys
import os
import django
from datetime import date,datetime
# Add the backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Setup Django
django.setup()


from bs4 import BeautifulSoup
import requests
from blog.models import Article,Section
session = requests.Session()
url_site1 = "https://onix-systems.com/blog/machine-learning-in-fraud-detection"
response = session.get(url_site1)

if response.status_code == 200 : 
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('h1')
    elements = soup.find('div',class_="blogArticle_blogPostContent__W7xaI __variable_c3323a")
   
    
   # Vérifier qu'il y a au moins deux éléments
   
          # Afficher le texte du deuxième élément
   
        
        # Parcourir tous les éléments dans la div `blog-text`
    def scrap():
        result = []

        current_title = title.text
        current_content = []
        current_subtitle = []
        for element in elements.children:
                print(element.name)
                # Vérifier si l'élément est un h2 (titre principal)
                
                    
                # Vérifier si l'élément est un h3 (sous-titre)
                if element.name == 'h2':
                    # Ajouter le sous-titre au titre principal courant
                    if current_title:
                        current_subtitle.append({
                            'subtitle': element.get_text(strip=True),
                            'content': []  # Le contenu des sous-titres peut être ajouté plus tard si nécessaire
                        })
                
                elif element.name == 'ul':
                    li = element.find_all('li')
                    for p in li:
                        if current_subtitle:
                                current_subtitle[-1]['content'].append(p.get_text(strip=True))
                    
                else :
                    # Ajouter le contenu sous le titre principal si nécessaire
                    if current_title and not current_subtitle:
                        current_content.append(element.get_text(strip=True))
                    # Ajouter le contenu sous un sous-titre
                    elif current_subtitle:
                        current_subtitle[-1]['content'].append(element.get_text(strip=True))
                
            # Ajouter le dernier titre et ses sous-titres à la liste de résultats
        if current_title:
                result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
            
        # Afficher ou traiter les résultats
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
                        'Scrapping_date': date.today, # Valeur par défaut pour Scrapping_date
                        'type' : "news" 
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
            print("Moins de deux éléments trouvés.")
    
else:
    print(f"Erreur de requête : {response.status_code}")