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


tables = tabula.read_pdf("C:/Users/ADEL/Desktop/L3/M1_Big_DATA/Vt/projet/Projet-VT/backend/4297.pdf", pages='all')



table_1_data = [{
                "Year" : row["Year"],
                "Algorithm" : row["Algorithm"],
                "Accuarcy" : row["Precision"],
                "Recall" : row["Recall"],
                "F1_score" : row["F1 Score"],
                "AUC" : row["AUC (%)"],

 } for row in tables[1].to_dict(orient='records') ]
thesis_data_1 = ThesisData.objects.create(
        titre = "Sample Data Analysis Table",
        info=json.dumps(table_1_data),# On stocke la liste sous forme de JSON
    )


new_row = {
    "Algorithm": "Decision_Trees",
    "Mean_Accuracy": "83.75",
    "SD_Accuracy": "0.91",
    "Mean_Precision": "79.6",
    "SD_Precision": "1.18",
    "Mean_Recall": "80.0",
    "SD_Recall": "0.75",
    "Mean_F1_score": "79.3",
    "SD_F1_score": "0.74",
    "Mean_AUC": "86.5",
    "SD_AUC": "1.04"
}
table2 = tables[2]
table2.columns = ["Algorithm", "Mean_Accuracy", "SD_Accuracy", "Mean_Precision", "SD_Precision", "Mean_Recall", "SD_Recall", 
                 "Mean_F1_score", "SD_F1_score", "Mean_AUC", "SD_AUC"]

# Corriger les erreurs de noms de lignes (par exemple remplacer 'Trees' par 'Decision_Trees')
table2['Algorithm'] = table2['Algorithm'].replace({"Decision": "Decision_Trees", "Random": "Random_Forest", "Neural": "Neural_Networks"})

# Supprimer les lignes avec 'Trees', 'Forest', 'Networks' qui ne sont pas valides
table2 = table2[~table2['Algorithm'].isin(['Trees','Forest', 'Networks'])]
table2 = table2._append(new_row, ignore_index=True)
# Remplacer les valeurs NaN par 0
table2 = table2.fillna(0)
table_dict2 = table2.to_dict(orient='records')
thesis_data_2 = ThesisData.objects.create(
    titre = "Descriptive Statistics ",
        info=table_dict2,# On stocke la liste sous forme de JSON
    )
# Inspecter la table nettoyée

table_3_data = [{
                "Algorithm" : row["Algorithm"],
                "Raw_Data" : row["Raw Data"],
                "Normalization" : row["Normalization"],
                "Missing_Imputation" : row["Missing"],
                "Feature_Selection" : row["Feature"],
                "SMOTE" : row["SMOTE"],

 } for row in tables[4].to_dict(orient='records') ]
table_3_data.pop(0)
thesis_data_3 = ThesisData.objects.create(
        titre = "Sample Data Analysis Table",
        info=json.dumps(table_3_data),# On stocke la liste sous forme de JSON
    )
table_4_data = [{
                "Algorithm" : row["Algorithm"],
                "Mean_F1-Score" : row["Unnamed: 0"],
                "Standard_Deviation" : row["Unnamed: 1"],
 } for row in tables[5].to_dict(orient='records') ]
thesis_data_4 = ThesisData.objects.create(
        titre = "Descriptive Statistics",
        info=json.dumps(table_4_data),# On stocke la liste sous forme de JSON
    )
table_5_data = [{
                "Metric" : row["Metric"],
                "Big_Data_Analytics" : row["Unnamed: 0"],
                "Rule-based_System" : row["Unnamed: 1"],
 } for row in tables[6].to_dict(orient='records') ]


thesis_data_5 = ThesisData.objects.create(
        titre  = "Sample Data Analysis Table ",
        info=json.dumps(table_5_data),# On stocke la liste sous forme de JSON
    )

table_6_data = [{
                "Metric" : row["Metric"],
                "Mean_Difference_(Big_Data_-_Rule-based)" : row["Mean Difference (Big Data - Rule-based)"],
 } for row in tables[7].to_dict(orient='records') ]


thesis_data_6 = ThesisData.objects.create(
    titre  = "Sample Data Analysis Table ",
        info=json.dumps(table_6_data),# On stocke la liste sous forme de JSON
    )
table_7_data = [{
                "Metric" : row["Metric"],
                "t-Statistic" : row["t-Statistic"],
                "p-Value" : row["p-Value"],
 } for row in tables[8].to_dict(orient='records') ]

thesis_data_7 = ThesisData.objects.create(
        titre = "Test Results",
        info=json.dumps(table_7_data),# On stocke la liste sous forme de JSON
    )

table_8_data = [{
                "Metric" : row["Metric"],
                "Big_Data_Analytics" : row["Unnamed: 0"],
                "Rule-based_System" : row["Unnamed: 1"],
                "Improvement" : row["Unnamed: 2"],
 } for row in tables[9].to_dict(orient='records') ]

thesis_data_8 = ThesisData.objects.create(
    titre = "A comparative table of performance results between big data analytics and rule-based systems, with the percentage improvement of big data analytics, can be provided for easy visualization. ",
        info=json.dumps(table_8_data),# On stocke la liste sous forme de JSON
    )