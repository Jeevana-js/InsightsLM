import openai
import os
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.getenv('OPENAI_API_KEY')
        )
        
    def generate_samacheer_kalvi_response(self, question: str, subject: str, class_level: str, context_messages: List[Dict] = None) -> str:
        """Generate response specifically from Samacheer Kalvi textbook content"""
        
        try:
            # Create Samacheer Kalvi specific system prompt
            system_prompt = f"""You are an expert on Tamil Nadu Samacheer Kalvi textbooks. You must answer questions using ONLY content from the official Samacheer Kalvi Class {class_level} {subject} textbook.

IMPORTANT GUIDELINES:
1. Always mention "Samacheer Kalvi" in your response
2. Provide specific chapter references when possible (e.g., "Chapter 3: Democracy")
3. Include page numbers if you can reference them (e.g., "As mentioned on page 45...")
4. Use exact terminology and definitions from the textbook
5. If diagrams or figures are mentioned, describe them as they appear in the textbook
6. For mathematical problems, use the exact methods taught in Samacheer Kalvi
7. Always maintain the educational tone appropriate for Class {class_level} students

Subject: {subject}
Class: {class_level}
Textbook: Official Tamil Nadu Samacheer Kalvi Curriculum

If you cannot find the specific information in the Samacheer Kalvi textbook, clearly state that and suggest checking the relevant chapter or section."""

            # Prepare messages
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            # Add context messages if provided
            if context_messages:
                messages.extend(context_messages)
            
            # Add the current question
            messages.append({
                "role": "user", 
                "content": f"Please answer this question using the Samacheer Kalvi Class {class_level} {subject} textbook: {question}"
            })
            
            # Generate response
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                max_tokens=1000,
                temperature=0.3,  # Lower temperature for more consistent educational content
            )
            
            answer = response.choices[0].message.content
            
            # Ensure the response mentions Samacheer Kalvi
            if "Samacheer Kalvi" not in answer:
                answer = f"According to the Samacheer Kalvi Class {class_level} {subject} textbook:\n\n{answer}"
            
            return answer
            
        except Exception as e:
            logger.error(f"AI Service error: {str(e)}")
            return f"I apologize, but I'm having trouble accessing the Samacheer Kalvi Class {class_level} {subject} textbook content right now. Please try rephrasing your question or check if the topic is covered in your current syllabus."
