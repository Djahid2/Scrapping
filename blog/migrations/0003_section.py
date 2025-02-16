# Generated by Django 5.1.3 on 2024-11-21 22:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_article_source'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_title', models.CharField(max_length=255)),
                ('section_content', models.TextField()),
                ('main_title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='blog.article')),
            ],
        ),
    ]
