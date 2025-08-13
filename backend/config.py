import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'samacheer-kalvi-secret-key-2024'
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # OpenAI configuration
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    
    # PDF processing configuration
    MAX_PDF_SIZE = 50 * 1024 * 1024  # 50MB
    PDF_TIMEOUT = 60  # seconds
    
    # Cache configuration
    CACHE_TIMEOUT = 3600  # 1 hour
    
    # Logging configuration
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    
    # CORS configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    # API configuration
    MAX_SEARCH_RESULTS = 10
    MAX_RESPONSE_LENGTH = 2000
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
