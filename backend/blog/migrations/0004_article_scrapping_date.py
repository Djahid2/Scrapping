# Generated by Django 5.1.3 on 2024-12-22 11:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_section'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='Scrapping_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
