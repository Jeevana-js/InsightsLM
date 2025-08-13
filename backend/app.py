from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.ai_service import AIService
from utils.pdf_processor import PDFProcessor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize services
ai_service = AIService()
pdf_processor = PDFProcessor()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Samacheer AI Learning Backend is running"
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint for homework help"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                "success": False,
                "message": "Message is required"
            }), 400
        
        question = data['message']
        subject = data.get('subject', 'social')
        class_level = data.get('class', '10')
        
        # Generate answer using AI service
        result = ai_service.generate_answer(question, subject, class_level)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error processing request: {str(e)}"
        }), 500

@app.route('/api/textbook/structure', methods=['GET'])
def get_textbook_structure():
    """Get textbook chapter structure"""
    try:
        subject = request.args.get('subject', 'social')
        class_level = request.args.get('class', '10')
        
        structure = pdf_processor.get_chapter_structure(subject, class_level)
        return jsonify(structure)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error getting textbook structure: {str(e)}"
        }), 500

@app.route('/api/textbook/search', methods=['POST'])
def search_textbook():
    """Search textbook content"""
    try:
        data = request.get_json()
        
        if not data or 'query' not in data:
            return jsonify({
                "success": False,
                "message": "Search query is required"
            }), 400
        
        query = data['query']
        subject = data.get('subject', 'social')
        class_level = data.get('class', '10')
        
        content = pdf_processor.search_content(query, subject, class_level)
        
        return jsonify({
            "success": True,
            "content": content,
            "query": query,
            "subject": subject
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error searching textbook: {str(e)}"
        }), 500

@app.route('/api/quiz/generate', methods=['POST'])
def generate_quiz():
    """Generate quiz questions from textbook content"""
    try:
        data = request.get_json()
        
        subject = data.get('subject', 'social')
        topic = data.get('topic', '')
        count = data.get('count', 5)
        
        if not topic:
            return jsonify({
                "success": False,
                "message": "Topic is required for quiz generation"
            }), 400
        
        result = ai_service.generate_quiz_questions(subject, topic, count)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error generating quiz: {str(e)}"
        }), 500

@app.route('/api/content/extract', methods=['POST'])
def extract_content():
    """Extract specific content from textbook"""
    try:
        data = request.get_json()
        
        subject = data.get('subject', 'social')
        topic = data.get('topic', '')
        
        if not topic:
            return jsonify({
                "success": False,
                "message": "Topic is required"
            }), 400
        
        content = pdf_processor.get_topic_content(subject, topic)
        
        return jsonify({
            "success": True,
            "content": content,
            "topic": topic,
            "subject": subject
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error extracting content: {str(e)}"
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"Starting Samacheer AI Learning Backend on port {port}")
    print(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
