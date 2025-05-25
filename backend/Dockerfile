FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set environment flags for compatibility
ENV CFLAGS="-Wno-error=deprecated-declarations -Wno-error=implicit-function-declaration"

# Set working directory
WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Install spaCy model
RUN python -m spacy download en_core_web_md

# Copy application code
COPY . .

# Expose the application port (if applicable)
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
