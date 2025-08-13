import PyPDF2
import io
import re
from typing import Dict, List, Optional, Tuple

class PDFProcessor:
    """Advanced PDF processing utilities"""
    
    @staticmethod
    def extract_text_with_structure(pdf_content: bytes) -> Dict[str, any]:
        """Extract text while preserving document structure"""
        try:
            pdf_file = io.BytesIO(pdf_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            pages = []
            for page_num, page in enumerate(pdf_reader.pages):
                text = page.extract_text()
                pages.append({
                    "page_number": page_num + 1,
                    "text": text,
                    "word_count": len(text.split())
                })
            
            return {
                "total_pages": len(pages),
                "pages": pages,
                "metadata": PDFProcessor.extract_metadata(pdf_reader)
            }
            
        except Exception as e:
            raise Exception(f"PDF processing failed: {str(e)}")
    
    @staticmethod
    def extract_metadata(pdf_reader) -> Dict[str, str]:
        """Extract PDF metadata"""
        try:
            metadata = pdf_reader.metadata
            return {
                "title": metadata.get('/Title', ''),
                "author": metadata.get('/Author', ''),
                "subject": metadata.get('/Subject', ''),
                "creator": metadata.get('/Creator', ''),
                "producer": metadata.get('/Producer', ''),
                "creation_date": str(metadata.get('/CreationDate', '')),
                "modification_date": str(metadata.get('/ModDate', ''))
            }
        except:
            return {}
    
    @staticmethod
    def find_chapter_boundaries(text: str) -> List[Tuple[str, int]]:
        """Find chapter/section boundaries in text"""
        patterns = [
            r'^Chapter\s+\d+[:\-\s]',
            r'^Unit\s+\d+[:\-\s]',
            r'^Lesson\s+\d+[:\-\s]',
            r'^\d+\.\s+[A-Z][^a-z]*$'
        ]
        
        boundaries = []
        lines = text.split('\n')
        
        for i, line in enumerate(lines):
            line = line.strip()
            for pattern in patterns:
                if re.match(pattern, line, re.IGNORECASE):
                    boundaries.append((line, i))
                    break
        
        return boundaries
    
    @staticmethod
    def clean_text(text: str) -> str:
        """Clean and normalize extracted text"""
        # Remove excessive whitespace
        text = re.sub(r'\n+', '\n', text)
        text = re.sub(r' +', ' ', text)
        
        # Remove page numbers and headers/footers
        lines = text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            line = line.strip()
            # Skip likely page numbers
            if re.match(r'^\d+$', line):
                continue
            # Skip very short lines that might be artifacts
            if len(line) < 3:
                continue
            cleaned_lines.append(line)
        
        return '\n'.join(cleaned_lines)
