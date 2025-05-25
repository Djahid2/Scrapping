import os
import django

# Spécifier le module de paramètres de ton projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Initialiser Django
django.setup()


from bs4 import BeautifulSoup
import requests
from blog.models import Article,Section
session = requests.Session()
url_site1 = 'https://binariks.com/blog/financial-fraud-detection-machine-learning/?utm_source=chatgpt.com'
response = session.get(url_site1)

if response.status_code == 200:
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Trouver l'élément <div> de départ (en utilisant un critère, par exemple un texte spécifique)
    div_elements = soup.find_all('div')  # Trouver tous les <div> sur la page
    
    # Définir le div de départ à partir du texte qu'il contient
    def scrap():
        start_div = None
        for div in div_elements:
            if 'Financia' in div.get_text():  # Tu peux ajuster ce texte à ce que tu cherches
                start_div = div
                break
        
    
        result = []

        current_title = None
        current_content = []
        current_subtitle = None
        
        # Parcourir tous les éléments dans la div `blog-text`
  
        for element in start_div.children:
            print(element.name)
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
                if len(headers) >= 3:
                    title1 = headers[1].get_text(strip=True)  # Le titre de la première colonne
                    title2 = headers[2].get_text(strip=True)  # Le titre de la deuxième colonne
                    
                    # Parcourir les lignes du tableau
                    for tt in element:
                        if tt.name == 'tr':
                            content = tt.find_all('td')
                            if len(content) >= 3:
                                data = f"{content[0].get_text(strip=True)} - {title1}: {content[1].get_text(strip=True)}. {title2}: {content[2].get_text(strip=True)}"
                                table_elemnt.append(data)
                else:  # Si le tableau n'a que 2 colonnes
                    title1 = headers[1].get_text(strip=True)
                    for tt in element:
                        if tt.name == 'tr':
                            content = tt.find_all('td')
                            if len(content) >= 2:
                                data = f"{content[0].get_text(strip=True)} - {title1}: {content[1].get_text(strip=True)}"
                                table_elemnt.append(data)
                
                # Ajouter les données du tableau au contenu principal ou sous-titre
                table_string = ". ".join(table_elemnt)  # Joindre les éléments du tableau en une seule chaîne avec ". "
                if current_title and not current_subtitle:
                    current_content.append(table_string)
                else:
                    current_subtitle[-1]['content'].append(table_string)

            else :
                # Ajouter le contenu sous le titre principal si nécessaire
                if current_title and not current_subtitle:
                    if element.get_text(strip=True) != "Make your banking solution fraud-free with machine learning technology" :
                        current_content.append(element.get_text(strip=True))
                # Ajouter le contenu sous un sous-titre
                elif current_subtitle:
                    if element.get_text(strip=True) != "Make your banking solution fraud-free with machine learning technology" :
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
                title=article_title,  # Vérifier l'existence de l'article par son titre
                defaults={'content': article_content, 'source': url_site1 }  # Valeur par défaut pour le champ source
            )

            if not created:
            # Si l'article existe déjà, mettre à jour son contenu si nécessaire
                article.content = article_content
                article.save()
                print('nothing to scrap')
            else:
                print('new article added')
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
                    print('new section added')
                else:
                # Si la section existe déjà, la mettre à jour (si nécessaire)
                    section_instance = Section.objects.get(
                    main_title=article, section_title=subtitle_title
                    )
                    section_instance.section_content = subtitle_content
                    section_instance.save()
        return result
    result = scrap()
    print(result)
    # Affichage ou autres traitements
    for section in result:
        print(f"Title: {section['title']}")
        print(f"Content: {' '.join(section['content'])}")
        for subtitle in section['subtitles']:
            print(f"  Subtitle: {subtitle['subtitle']}")
            print(f"    Content: {', '.join(subtitle['content'])}")
else:
    print(f"Erreur de requête : {response.status_code}")