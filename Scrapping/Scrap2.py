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
url_site1 = 'https://www.talend.com/fr/resources/big-data-finance/'
response = session.get(url_site1)

if response.status_code == 200 : 
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    elements = soup.find('section',class_='container px-2 md:px-4 text-c_slate pageWithSideBar')
    
    result = []

    current_title = None
    current_content = []
    current_subtitle = None
    
    # Parcourir tous les éléments dans la div `blog-text`
    for element in elements.children:
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
            title=article_title,  # Vérifier l'existence de l'article par son titre
            defaults={'content': article_content, 'source': url_site1 }  # Valeur par défaut pour le champ source
        )

        if not created:
        # Si l'article existe déjà, mettre à jour son contenu si nécessaire
            article.content = article_content
            article.save()
    
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

# Affichage ou autres traitements
    for section in result:
        print(f"Title: {section['title']}")
        print(f"Content: {' '.join(section['content'])}")
        for subtitle in section['subtitles']:
            print(f"  Subtitle: {subtitle['subtitle']}")
            print(f"    Content: {', '.join(subtitle['content'])}")
else:
    print(f"Erreur de requête : {response.status_code}")