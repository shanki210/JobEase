# **JobEase**

## **Project Description**
The **JobEase** is a web application developed for the **IRDE (Instruments Research and Development Establishment), DRDO (Defence Research and Development Organisation)** to simplify the management of internship applications. This portal allows students to easily apply for internships by uploading resumes, automatically generates cover letters, and helps admins streamline the recruitment process by matching resumes with job descriptions using AI.

The project incorporates cutting-edge technologies like **Gemini API** (for AI-driven resume-to-job matching and cover letter generation) and **Tesseract.js** (for resume text extraction). It provides a seamless and intuitive interface for both students and admins, ensuring an efficient and organized internship application process.

## **Features**
- **Student Dashboard**: Allows students to browse internships, upload resumes, apply for internships, and manage their applications.
- **Admin Dashboard**: Allows admins to post new internship opportunities, view applications, and automatically match resumes to job descriptions.
- **AI Cover Letter Generation**: Automatically generates personalized cover letters based on the student’s resume and job description using the **Gemini API** (LLM).
- **Resume Matching**: Uses the **Gemini API** to semantically match student resumes to internship requirements, providing a matching score for admin evaluation.
- **Text Extraction**: Integrates **Tesseract.js** to extract text from uploaded resume PDFs for better matching and processing.
- **Responsive Design**: Optimized for all device types (desktops, tablets, and mobiles).
- **Security**: Secured student and admin authentication, with role-based access control.

## **Technologies Used**
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL database)
- **AI Integration**: Gemini API (Large Language Model for resume-to-job matching and cover letter generation)
- **OCR**: Tesseract.js (for extracting text from resume PDFs)
- **Authentication**: JWT (JSON Web Tokens) for secure login
- **Styling**: CSS for responsive and modern UI

## **Project Structure**
The project is divided into three main sections:
1. **Student Section**: Where students can browse available internships, apply, and manage their applications.
2. **Admin Section**: Where admins can post internship opportunities, view student applications, and trigger the AI-based resume matching.
3. **AI Features**: Integrated AI services for cover letter generation and resume-to-job matching, making the process more efficient for students and admins alike.

## **Installation and Setup**
To run this project locally, follow the steps below:

### **1. Clone the repository**
```bash
git clone https://github.com/shanki210/JobEase.git
cd JobEase
