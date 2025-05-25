import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Scrapping.settings')

# Initialiser Django
django.setup()

import tabula
from blog.models import ThesisData
import json
from datetime import date,datetime
import pdfplumber

pdf_path = "C:/Users/ADEL/Desktop/L3/M1_Big_DATA/Vt/projet/Projet-VT/backend/thesis.pdf"
# Extraction des tableaux
tables = tabula.read_pdf("C:/Users/ADEL/Desktop/L3/M1_Big_DATA/Vt/projet/Projet-VT/backend/thesis.pdf", pages='all')

# Remplir le modèle avec les données des tableaux
# Tableau 1 (Techniques et fréquence d'utilisation)
def extract_date_from_page(pdf_path, page_number=2):
    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[page_number - 1]  # Les pages sont indexées à partir de 0
        text = page.extract_text()
        # Recherche de la date au format mois année (e.g., "May 2020")
        for line in text.split("\n"):
            if any(month in line for month in ["January", "February", "March", "April", "May", "June",
                                               "July", "August", "September", "October", "November", "December"]):
                try:
                    # Extraction et conversion en objet datetime
                    date_extracted = datetime.strptime(line.strip(), "%B %Y").date()
                    return date_extracted
                except ValueError:
                    continue
    return None

# Extraire la date
scrap_static_data = extract_date_from_page(pdf_path)
print(scrap_static_data)
if scrap_static_data :
    table_1_data = [
        { "Technique": row['Technique'],  "Frequency_of_use": row['Frequency of use']}
        for row in tables[1].to_dict(orient='records')  # Convertit les lignes du tableau en dictionnaires
    ]
    thesis_data_1 = ThesisData.objects.create(
        titre = "Frequency of use of machine learning techniques in fraud detection problems",
        info=json.dumps(table_1_data),# On stocke la liste sous forme de JSON
        Scrap_statique_data = scrap_static_data
    )


    # Tableau 6 (Statistiques de la base de données)
    table_6_data = [
        {"description": row['Unnamed: 0'], "step": row['step'], "amount": row['amount'],
        "oldbalanceOrg": row['oldbalanceOrg'], "newbalanceOrg": row['newbalanceOrig'],
        "oldbalanceDest": row['oldbalanceDest'], "newbalanceDest": row['newbalanceDest']}
        for row in tables[4].to_dict(orient='records')
    ]
    thesis_data_6 = ThesisData.objects.create(
        titre = "Summary of Statistics of Numeric Variables ",
        info=json.dumps(table_6_data),
        Scrap_statique_data = scrap_static_data
    )

    # Tableau 7 (Types de transactions et autres informations)
    print(tables[6])
    table_7_data = [
    {
        "description": row['Unnamed: 0'],  # Ajout de la colonne Unnamed: 0
        "transaction_type": row['type'],
        "nameOrig": row['nameOrig'],
        "nameDest": row['nameDest'],
        "isFraud": row['isFraud'],
        "isFlaggedFraud": row['isFlaggedFraud']
    }
    for row in tables[6].to_dict(orient='records')
    ]
    thesis_data_7 = ThesisData.objects.create(
        titre = "Summary of Statistics of Categorical Variables",
        info=json.dumps(table_7_data),
        Scrap_statique_data = scrap_static_data
    )

    # Tableau 8 (Modèles et précision des tests)
    table_8_data = [
        {"Model": row['Model'], "train_precision": row['Train Precision'], "train_recall": row['Train Recall'],
        "test_precision": row['Test Precision'], "test_recall": row['Test Recall']}
        for row in tables[7].to_dict(orient='records')
    ]
    thesis_data_8 = ThesisData.objects.create(
        titre = "Comparison of Results of Logistic Regression and Random Forest ",
        info=json.dumps(table_8_data),
        Scrap_statique_data = scrap_static_data
    )
