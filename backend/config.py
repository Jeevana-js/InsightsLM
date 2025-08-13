import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    # PDF settings
    PDF_DOWNLOAD_TIMEOUT = 30
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB max file size
    
    # API settings
    API_VERSION = 'v1'
    API_PREFIX = f'/api/{API_VERSION}'
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:3001']
