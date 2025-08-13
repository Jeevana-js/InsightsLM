import PyPDF2
import os
import re
from typing import List, Dict, Any, Optional
import json
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class PDFProcessor:
    def __init__(self):
        self.textbook_path = "textbooks/"
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.content_cache = {}
        self.embeddings_cache = {}
        
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from PDF file"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num, page in enumerate(pdf_reader.pages):
                    page_text = page.extract_text()
                    # Clean and structure the text
                    cleaned_text = self._clean_text(page_text)
                    if cleaned_text.strip():
                        text += f"\n--- Page {page_num + 1} ---\n{cleaned_text}\n"
                
                return text
        except Exception as e:
            print(f"Error extracting text from {pdf_path}: {str(e)}")
            return ""
    
    def _clean_text(self, text: str) -> str:
        """Clean and structure extracted text"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove Tamil text (Unicode range U+0B80–U+0BFF)
        text = re.sub(r'[\u0B80-\u0BFF]+', '', text)
        
        # Fix common OCR issues
        text = text.replace('', '')
        text = text.replace('\x00', '')
        
        # Structure the text better
        # Add line breaks before chapter headings
        text = re.sub(r'(Chapter \d+|CHAPTER \d+)', r'\n\n\1', text)
        text = re.sub(r'(Unit \d+|UNIT \d+)', r'\n\n\1', text)
        
        return text.strip()
    
    def load_textbook_content(self, subject: str, class_level: str = "10") -> Dict[str, Any]:
        """Load and process textbook content"""
        cache_key = f"{subject}_{class_level}"
        
        if cache_key in self.content_cache:
            return self.content_cache[cache_key]
        
        # Map subject to PDF filename
        pdf_files = {
            "social": f"tn-class-{class_level}-social-science.pdf",
            "science": f"tn-class-{class_level}-science.pdf",
            "mathematics": f"tn-class-{class_level}-mathematics.pdf",
            "english": f"tn-class-{class_level}-english.pdf",
            "tamil": f"tn-class-{class_level}-tamil.pdf"
        }
        
        pdf_filename = pdf_files.get(subject)
        if not pdf_filename:
            return {"success": False, "message": "Subject not found"}
        
        pdf_path = os.path.join("public/textbooks", pdf_filename)
        
        if not os.path.exists(pdf_path):
            return {"success": False, "message": "Textbook PDF not found"}
        
        # Extract text from PDF
        full_text = self.extract_text_from_pdf(pdf_path)
        
        if not full_text:
            return {"success": False, "message": "Could not extract text from PDF"}
        
        # Structure the content
        structured_content = self._structure_content(full_text, subject)
        
        # Cache the content
        self.content_cache[cache_key] = {
            "success": True,
            "content": structured_content,
            "full_text": full_text
        }
        
        return self.content_cache[cache_key]
    
    def _structure_content(self, text: str, subject: str) -> Dict[str, Any]:
        """Structure the textbook content into chapters and topics"""
        chapters = {}
        current_chapter = None
        current_content = []
        
        lines = text.split('\n')
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Detect chapter headings
            chapter_match = re.match(r'(Chapter|CHAPTER)\s+(\d+)', line, re.IGNORECASE)
            if chapter_match:
                # Save previous chapter
                if current_chapter and current_content:
                    chapters[current_chapter] = {
                        "title": current_chapter,
                        "content": '\n'.join(current_content),
                        "topics": self._extract_topics('\n'.join(current_content))
                    }
                
                # Start new chapter
                current_chapter = line
                current_content = []
            else:
                if current_chapter:
                    current_content.append(line)
        
        # Save last chapter
        if current_chapter and current_content:
            chapters[current_chapter] = {
                "title": current_chapter,
                "content": '\n'.join(current_content),
                "topics": self._extract_topics('\n'.join(current_content))
            }
        
        return {
            "subject": subject,
            "chapters": chapters,
            "total_chapters": len(chapters)
        }
    
    def _extract_topics(self, chapter_content: str) -> List[str]:
        """Extract topics from chapter content"""
        topics = []
        
        # Look for numbered sections, bold headings, etc.
        lines = chapter_content.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # Match patterns like "1.1", "2.3", etc.
            if re.match(r'^\d+\.\d+', line):
                topics.append(line)
            # Match patterns that look like headings (all caps, or title case)
            elif len(line) > 10 and len(line) < 100:
                if line.isupper() or line.istitle():
                    topics.append(line)
        
        return topics[:10]  # Limit to 10 topics per chapter
    
    def search_content(self, query: str, subject: str, class_level: str = "10") -> str:
        """Search for relevant content based on query"""
        # Load textbook content
        textbook_data = self.load_textbook_content(subject, class_level)
        
        if not textbook_data.get("success"):
            return ""
        
        full_text = textbook_data.get("full_text", "")
        
        # Split text into chunks for better search
        chunks = self._split_into_chunks(full_text, chunk_size=500)
        
        if not chunks:
            return ""
        
        # Create embeddings for query and chunks
        query_embedding = self.model.encode([query])
        chunk_embeddings = self.model.encode(chunks)
        
        # Calculate similarities
        similarities = cosine_similarity(query_embedding, chunk_embeddings)[0]
        
        # Get top 3 most relevant chunks
        top_indices = np.argsort(similarities)[-3:][::-1]
        
        relevant_content = []
        for idx in top_indices:
            if similarities[idx] > 0.3:  # Threshold for relevance
                relevant_content.append(chunks[idx])
        
        return '\n\n'.join(relevant_content)
    
    def _split_into_chunks(self, text: str, chunk_size: int = 500) -> List[str]:
        """Split text into chunks for processing"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size):
            chunk = ' '.join(words[i:i + chunk_size])
            if chunk.strip():
                chunks.append(chunk)
        
        return chunks
    
    def get_topic_content(self, subject: str, topic: str) -> str:
        """Get content for a specific topic"""
        textbook_data = self.load_textbook_content(subject)
        
        if not textbook_data.get("success"):
            return ""
        
        chapters = textbook_data["content"]["chapters"]
        
        # Search for topic in all chapters
        for chapter_name, chapter_data in chapters.items():
            content = chapter_data["content"]
            if topic.lower() in content.lower():
                # Extract relevant section
                lines = content.split('\n')
                relevant_lines = []
                found_topic = False
                
                for line in lines:
                    if topic.lower() in line.lower():
                        found_topic = True
                    
                    if found_topic:
                        relevant_lines.append(line)
                        
                        # Stop at next major heading or after 20 lines
                        if len(relevant_lines) > 20 or (len(relevant_lines) > 5 and re.match(r'^\d+\.\d+', line)):
                            break
                
                return '\n'.join(relevant_lines)
        
        return ""
    
    def get_chapter_structure(self, subject: str, class_level: str = "10") -> Dict[str, Any]:
        """Get the structure of chapters and topics"""
        textbook_data = self.load_textbook_content(subject, class_level)
        
        if not textbook_data.get("success"):
            return {"success": False, "message": "Could not load textbook"}
        
        chapters = textbook_data["content"]["chapters"]
        structure = []
        
        for chapter_name, chapter_data in chapters.items():
            structure.append({
                "chapter": chapter_name,
                "title": chapter_data["title"],
                "topics": chapter_data["topics"]
            })
        
        return {
            "success": True,
            "subject": subject,
            "class": class_level,
            "chapters": structure
        }
