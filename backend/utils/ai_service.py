import openai
import os
from typing import List, Dict, Any
import re
from .pdf_processor import PDFProcessor

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.pdf_processor = PDFProcessor()
        
    def generate_answer(self, question: str, subject: str = "social", class_level: str = "10") -> Dict[str, Any]:
        """Generate answer from textbook content - English only"""
        try:
            # Get relevant content from textbook
            relevant_content = self.pdf_processor.search_content(question, subject, class_level)
            
            if not relevant_content:
                return {
                    "success": False,
                    "message": "No relevant content found in the textbook for this question."
                }
            
            # Create enhanced prompt for better textbook-based answers
            system_prompt = """You are an advanced AI tutor specializing in Tamil Nadu State Board Class 10 curriculum. 
            
            IMPORTANT INSTRUCTIONS:
            1. Answer ONLY in English - NO Tamil text whatsoever
            2. Base your answers strictly on the provided textbook content
            3. Include specific page references and chapter information
            4. Provide detailed explanations with examples from the textbook
            5. Structure your response with clear headings and bullet points
            6. Include study tips and exam preparation advice
            7. Reference official Samacheer Kalvi textbook content only
            
            Format your response as:
            **Answer from Samacheer Kalvi Textbook:**
            [Detailed explanation based on textbook content]
            
            **Key Points:**
            • [Important point 1]
            • [Important point 2]
            • [Important point 3]
            
            **Textbook Reference:**
            Chapter: [Chapter name and number]
            Page: [Page number]
            
            **Study Tip:**
            [Helpful study advice related to the topic]
            """
            
            user_prompt = f"""
            Question: {question}
            Subject: {subject.title()}
            Class: {class_level}
            
            Relevant textbook content:
            {relevant_content}
            
            Please provide a comprehensive answer based strictly on this textbook content. 
            Remember: Answer only in English, no Tamil text.
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=1500,
                temperature=0.3
            )
            
            answer = response.choices[0].message.content
            
            # Double-check to remove any Tamil text that might have slipped through
            answer = self._remove_tamil_text(answer)
            
            return {
                "success": True,
                "answer": answer,
                "source": "Official Samacheer Kalvi Textbook",
                "subject": subject,
                "class": class_level
            }
            
        except Exception as e:
            return {
                "success": False,
                "message": f"Error generating answer: {str(e)}"
            }
    
    def _remove_tamil_text(self, text: str) -> str:
        """Remove any Tamil characters from the text"""
        # Tamil Unicode range: U+0B80–U+0BFF
        tamil_pattern = r'[\u0B80-\u0BFF]+'
        # Remove Tamil characters
        cleaned_text = re.sub(tamil_pattern, '', text)
        # Clean up extra whitespace
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
        return cleaned_text
    
    def generate_quiz_questions(self, subject: str, topic: str, count: int = 5) -> Dict[str, Any]:
        """Generate quiz questions from textbook content"""
        try:
            # Get content for the specific topic
            content = self.pdf_processor.get_topic_content(subject, topic)
            
            if not content:
                return {
                    "success": False,
                    "message": "No content found for this topic."
                }
            
            system_prompt = """You are creating quiz questions for Tamil Nadu Class 10 students based on official textbook content.
            
            Create multiple choice questions that:
            1. Are based strictly on the provided textbook content
            2. Test understanding of key concepts
            3. Include proper explanations
            4. Reference specific textbook pages
            5. Are appropriate for Class 10 level
            
            Format each question as JSON with: question, options (array of 4), correct_answer (index), explanation, page_reference
            """
            
            user_prompt = f"""
            Create {count} multiple choice questions based on this textbook content:
            
            Subject: {subject}
            Topic: {topic}
            Content: {content}
            
            Return as a JSON array of questions.
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=2000,
                temperature=0.4
            )
            
            return {
                "success": True,
                "questions": response.choices[0].message.content
            }
            
        except Exception as e:
            return {
                "success": False,
                "message": f"Error generating quiz: {str(e)}"
            }
