import PyPDF2
import os
import re
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

class PDFProcessor:
    def __init__(self):
        self.textbook_paths = {
            '10': {
                'social science': 'textbooks/tn-class-10-social-science-official.pdf',
                'mathematics': 'textbooks/tn-class-10-mathematics.pdf',
                'science': 'textbooks/tn-class-10-science.pdf',
                'english': 'textbooks/tn-class-10-english.pdf',
                'tamil': 'textbooks/tn-class-10-tamil.pdf'
            },
            '11': {
                'mathematics': 'textbooks/class-11-mathematics.pdf',
                'physics': 'textbooks/class-11-physics.pdf',
                'chemistry': 'textbooks/class-11-chemistry.pdf',
                'biology': 'textbooks/class-11-biology.pdf',
                'english': 'textbooks/class-11-english.pdf',
                'tamil': 'textbooks/class-11-tamil.pdf'
            },
            '12': {
                'mathematics': 'textbooks/class-12-mathematics.pdf',
                'physics': 'textbooks/class-12-physics.pdf',
                'chemistry': 'textbooks/class-12-chemistry.pdf',
                'biology': 'textbooks/class-12-biology.pdf',
                'english': 'textbooks/class-12-english.pdf',
                'tamil': 'textbooks/class-12-tamil.pdf'
            }
        }
    
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text content from PDF file"""
        try:
            if not os.path.exists(pdf_path):
                logger.error(f"PDF file not found: {pdf_path}")
                return ""
            
            text = ""
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text() + "\n"
            
            return text
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF {pdf_path}: {str(e)}")
            return ""
    
    def extract_chapter_content(self, subject: str, class_level: str, chapter: str = "") -> str:
        """Extract specific chapter content from Samacheer Kalvi textbook"""
        try:
            # Get the PDF path for the subject and class
            pdf_path = self.textbook_paths.get(class_level, {}).get(subject.lower())
            
            if not pdf_path:
                return f"Textbook not available for Class {class_level} {subject}"
            
            # Extract full text
            full_text = self.extract_text_from_pdf(pdf_path)
            
            if not full_text:
                return f"Could not extract content from Class {class_level} {subject} textbook"
            
            # If specific chapter is requested, try to extract it
            if chapter:
                chapter_content = self._extract_specific_chapter(full_text, chapter)
                if chapter_content:
                    return chapter_content
            
            # Return first 2000 characters as preview if no specific chapter
            preview = full_text[:2000]
            return f"Samacheer Kalvi Class {class_level} {subject} textbook content:\n\n{preview}..."
            
        except Exception as e:
            logger.error(f"Error extracting chapter content: {str(e)}")
            return f"Error accessing Samacheer Kalvi textbook content: {str(e)}"
    
    def _extract_specific_chapter(self, text: str, chapter: str) -> Optional[str]:
        """Extract specific chapter from the full text"""
        try:
            # Common chapter patterns in Samacheer Kalvi textbooks
            patterns = [
                rf"Chapter\s+{chapter}[:\s]+(.*?)(?=Chapter\s+\d+|$)",
                rf"Unit\s+{chapter}[:\s]+(.*?)(?=Unit\s+\d+|$)",
                rf"{chapter}[:\.\s]+(.*?)(?=\d+[:\.\s]|$)"
            ]
            
            for pattern in patterns:
                match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
                if match:
                    chapter_content = match.group(1).strip()
                    if len(chapter_content) > 100:  # Ensure we got substantial content
                        return f"Chapter {chapter} from Samacheer Kalvi textbook:\n\n{chapter_content[:1500]}..."
            
            return None
            
        except Exception as e:
            logger.error(f"Error extracting specific chapter: {str(e)}")
            return None
    
    def search_content(self, subject: str, class_level: str, search_term: str) -> List[str]:
        """Search for specific content in the textbook"""
        try:
            pdf_path = self.textbook_paths.get(class_level, {}).get(subject.lower())
            
            if not pdf_path:
                return []
            
            full_text = self.extract_text_from_pdf(pdf_path)
            
            if not full_text:
                return []
            
            # Find all sentences containing the search term
            sentences = re.split(r'[.!?]+', full_text)
            matching_sentences = []
            
            for sentence in sentences:
                if search_term.lower() in sentence.lower():
                    clean_sentence = sentence.strip()
                    if len(clean_sentence) > 20:  # Filter out very short matches
                        matching_sentences.append(clean_sentence)
            
            return matching_sentences[:5]  # Return top 5 matches
            
        except Exception as e:
            logger.error(f"Error searching content: {str(e)}")
            return []
