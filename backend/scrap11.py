import os
import django
from datetime import date
# Spécifier le module de paramètres de ton projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Initialiser Django
django.setup()


from bs4 import BeautifulSoup
import requests
from blog.models import Article,Section
session = requests.Session()
url_site1 = "https://www.nature.com/articles/s41599-024-03606-0"
response = session.get(url_site1)

if response.status_code == 200 : 
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('h1',class_ = "c-article-title")
    articles = soup.find('div', class_ = "main-content")
    elements = articles.find_all('section', attrs={'data-title': True})
    print(len(elements))
    
    
          # Afficher le texte du deuxième élément
  
        
        # Parcourir tous les éléments dans la div `blog-text`
    def scrap():
        result = []

        current_title = title.text
        current_content = []
        current_subtitle = []
        for section in elements:
                subtitle = section.find('h2')

                
                # Vérifier si l'élément est un h2 (titre principal)

                """if element.name == 'h2':
                    if current_title:  # Si on a déjà un titre précédent, on l'ajoute à la liste
                        result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
                    
                    # Mettre à jour le titre principal et réinitialiser les autres variables
                    current_title = element.get_text(strip=True)
                    current_content = []  # Réinitialiser le contenu du titre principal
                    current_subtitle = []  # Réinitialiser les sous-titres
                    """
                # Vérifier si l'élément est un h3 (sous-titre)
                if subtitle:
                    # Ajouter le sous-titre au titre principal courant
                    if current_title:
                        current_subtitle.append({
                            'subtitle': subtitle.get_text(strip=True),
                            'content': []  # Le contenu des sous-titres peut être ajouté plus tard si nécessaire
                        })
                

                
                paragrpahe = section.find('div',class_ = "c-article-section__content")
                print(len(paragrpahe))
                for element in paragrpahe : 
                    # Ajouter le contenu sous le titre principal si nécessaire
                        # Ajouter le contenu sous un sous-titre
                        if current_subtitle:
                            current_subtitle[-1]['content'].append(element.get_text(strip=True))
                
            # Ajouter le dernier titre et ses sous-titres à la liste de résultats
        if current_title:
                result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
        
        custom_date = date(2024, 9, 3)    # Afficher ou traiter les résultats
        for section in result:
            # Vérifier si l'article existe déjà dans la base de données
                article_title = section['title']
                article_content = ' '.join(section['content'])  # Joindre le contenu de l'article
            
                article, created = Article.objects.get_or_create(
                    title=article_title,  # Critère de recherche par le titre
                    source=url_site1,  # Critère de recherche par la source
                    defaults={
                        'content': article_content,
                        'Scrapping_date': custom_date # Valeur par défaut pour Scrapping_date
                    }
                )

                if not created:
                # Si l'article existe déjà, mettre à jour son contenu si nécessaire
                    article.content = article_content
                    article.save()
                    print("nothing to scrap")
                else:
                    print(" new Article add")

            
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