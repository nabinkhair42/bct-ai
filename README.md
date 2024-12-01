# Engineering Notes Chatbot 📚🤖 (Name Chai Socheko xaina)


A modern web app to simplify access to engineering study materials and resources using an AI-powered chatbot. This project utilizes Next.js, Gemini AI, and shadcn/ui to deliver a seamless user experience for interacting with educational content.

## 🚀 Features
1. Chatbot Interaction
Ask questions to access curated study materials, PDFs, YouTube playlists, and learning tips.
AI-powered responses tailored to user queries.
Handles a wide range of queries, including subject-specific, semester-specific, and general study advice.
2. Organized Resource Search
Retrieves content directly from the scraped blog data.
Provides links to PDFs, YouTube playlists, and additional resources.
3. Advanced UI/UX
Sleek and modern interface built using shadcn/ui.
Intuitive chat design with typing indicators, error handling, and message history.
4. Intelligent Search
Implements vector similarity search using a vector database (e.g., Pinecone or Supabase).
Context-aware responses by mapping user questions to the most relevant resources.
5. Real-Time AI Responses
Integrated with Google Gemini AI for generating intelligent and accurate responses.
Optimized prompts to deliver concise and relevant answers.
6. Scalable and Secure Deployment
Hosted on Vercel for easy scaling and reliability.
Includes analytics to track user interactions and monitor API usage.

# 🛠️ Tech Stack
**Frontend**
1. **Next.js:** Framework for building the web app.
2. **shadcn/ui:** Component library for creating beautiful and accessible UI.
3. **TypeScript:** Ensures type safety and better developer experience.

**Backend:**
1. **Gemini AI API:** For natural language understanding and generating responses.
2. **Supabase + pgvector:** Vector database for similarity search. Alternatively, Pinecone can be used for high-performance vector search. {Thinking ...}

**Web Scraping & Data Storage**
1. **Scrapy/Puppeteer/BeautifulSoup:** Tools for extracting and cleaning data from the blog.
2. **PostgreSQL:** For storing structured blog content (categories, subjects, PDFs, and YouTube links).

**Deployment**
1. Vercel: For hosting the Next.js app.



## Fun Part:

We will be heavily rely on https://bctengineeringnotes.blogspot.com/ for scrapping and collecting data.



### Project is just started on Dec 1,2024. Lets See When it will be completed.

### By : Not a Experienced Developer 😂