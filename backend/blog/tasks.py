from celery import shared_task
from django.utils import timezone
from .models import Article,Section
import logging
import secrets
import string
from datetime import datetime

logger = logging.getLogger(__name__)
@shared_task
def testTask():
    print("helo")