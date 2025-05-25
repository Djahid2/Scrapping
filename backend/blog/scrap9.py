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
url_site1 = 'https://www.leewayhertz.com/build-financial-fraud-detection-system-using-ml-models/#machine-learning-vs-traditional-statistical-methods'
response = session.get(url_site1)

if response.status_code == 200 : 
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    elements = soup.find_all('div', class_= "et_pb_text_inner")
    if(len(elements) >= 11):
        
          # Afficher le texte du deuxième élément
       
        def scrap(): 
            result = []

            current_title = None
            current_content = []
            current_subtitle = None
            for i in range(3, 11):
            # Parcourir tous les éléments dans la div `blog-text`
                current_element = elements[i]
                for element in current_element.children:

                    # Vérifier si l'élément est un h2 (titre principal)
                    if element.name == 'h2':
                        if current_title:  # Si on a déjà un titre précédent, on l'ajoute à la liste
                            result.append({'title': current_title, 'content': current_content, 'subtitles': current_subtitle})
                        
                        # Mettre à jour le titre principal et réinitialiser les autres variables
                        current_title = element.get_text(strip=True)
                        current_content = []  # Réinitialiser le contenu du titre principal
                        current_subtitle = []  # Réinitialiser les sous-titres
                        
                    # Vérifier si l'élément est un h3 (sous-titre)
                    elif element.name == 'h3':
                        # Ajouter le sous-titre au titre principal courant
                        if current_title:
                            current_subtitle.append({
                                'subtitle': element.get_text(strip=True),
                                'content': []  # Le contenu des sous-titres peut être ajouté plus tard si nécessaire
                            })
                    elif element.name == 'table':
                        table_elemnt = []  # Liste temporaire pour les lignes du tableau
                        
                        # Trouver les titres de colonnes
                        headers = element.find_all('tr')[0].find_all('td')
                        parcoure = element.find_all('tr')
                    
                        if len(headers) >= 3:
                            title1 = headers[1].get_text(strip=True)  # Le titre de la première colonne
                            title2 = headers[2].get_text(strip=True)  # Le titre de la deuxième colonne
                        
                            # Parcourir les lignes du tableau
                            for tt in parcoure[1:]:
                                if tt.name == 'tr':
                                    content = tt.find_all('td')
                                    if len(content) >= 3:
                                        data = f"{content[0].get_text(strip=True)} - {title1}: {content[1].get_text(strip=True)} . {title2}: {content[2].get_text(strip=True)} ."
                                        table_elemnt.append(data)
                        else:  # Si le tableau n'a que 2 colonnes
                            title1 = headers[1].get_text(strip=True)
                            for tt in parcoure[1:]:
                                if tt.name == 'tr':
                                    content = tt.find_all('td')
                                    if len(content) >= 2:
                                        data = f"{content[0].get_text(strip=True)} - {title1}: {content[1].get_text(strip=True)}"
                                        table_elemnt.append(data)
                        
                        # Ajouter les données du tableau au contenu principal ou sous-titre
                        table_string = " ".join(table_elemnt)  # Joindre les éléments du tableau en une seule chaîne avec ". "
                        
                        if current_title and not current_subtitle:
                            current_content.append(table_string)
                        else:
                            current_subtitle[-1]['content'].append(table_string)
                
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
                    print('nothing to scrap')
                else:
                    print('new article add')
            
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
                        print('new section add')
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