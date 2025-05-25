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


tables = tabula.read_pdf("C:/Users/ADEL/Desktop/L3/M1_Big_DATA/Vt/projet/Projet-VT/backend/Complexity - 2020 - Liu - Quantitative Detection of Financial Fraud Based on Deep Learning with Combination of E‐Commerce.pdf", pages=8)

for table in tables : 
    print(table)
    print("/////")

print(tables[0].columns)

table_1_data = [{
                "Sample number" : row["Sample number"],
                "Number of samples" : row["Number of samples"],
                "Contains the number of frauds" : row["Contains the number of frauds"],
                "Actual fraud rate" : row["Actual fraud rate"],
                "Predicted fraud rate" : row["Predicted fraud rate"],

 } for row in tables[0].to_dict(orient='records') ]

thesis_data_1 = ThesisData.objects.create(
        titre = "Comparisonofactual fraud rate and predicted fraud rate in the training set",
        info=json.dumps(table_1_data),# On stocke la liste sous forme de JSON
    )