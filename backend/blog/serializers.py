from rest_framework import serializers
from rest_framework.serializers import Serializer, CharField, ValidationError

from django.contrib.auth import get_user_model
from .models import *
from django.core.exceptions import ValidationError
import smtplib
from django.conf import settings

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'content', 'source']

class ThesisDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThesisData
        fields = '__all__' 