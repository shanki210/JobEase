// import { ErrorHandler } from "../middlewares/error.js";
// import exceljs from "exceljs";
// import genAI from "@google/generative-ai";

// const genAIClient = new genAI.GenerativeModel({ model: "gemini-1.5-flash" });

// const scoreApplication = async (resumeBase64, jobTitle, jobDescription) => {
//   const prompt = `Score this resume for the job title "${jobTitle}" and description "${jobDescription}". Return a score between 0 and 100.`;
  
//   const inputParts = [
//     { text: prompt },
//     { inlineData: { data: resumeBase64, mimeType: "application/pdf" } }
//   ];

//   try {
//     const result = await genAIClient.generateContent(inputParts);
//     const response = result.response;
//     const score = parseFloat(response.text());
//     return score;
//   } catch (error) {
//     console.error("Error generating score:", error);
//     return null;
//   }
// };

// export const scoreApplicationsAndGenerateExcel = async (req, res, next) => {
//   try {
//     const applications = await Application.find(); // Fetch all applications

//     const scoredApplications = await Promise.all(applications.map(async (app) => {
//       const resumeBase64 = Buffer.from(app.resume.data).toString("base64");
//       const score = await scoreApplication(resumeBase64, app.jobTitle, app.jobDescription);
//       return { ...app._doc, score };
//     }));

//     const filteredApplications = scoredApplications.filter(app => app.score > 70);

//     // Generate Excel file
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet("High Scoring Applications");

//     worksheet.columns = [
//       { header: "Name", key: "name" },
//       { header: "Email", key: "email" },
//       { header: "Phone", key: "phone" },
//       { header: "Address", key: "address" },
//       { header: "CoverLetter", key: "coverLetter" },
//       { header: "Score", key: "score" },
//     ];

//     filteredApplications.forEach(app => {
//       worksheet.addRow({
//         name: app.name,
//         email: app.email,
//         phone: app.phone,
//         address: app.address,
//         coverLetter: app.coverLetter,
//         score: app.score,
//       });
//     });

//     const buffer = await workbook.xlsx.writeBuffer();

//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//     res.setHeader("Content-Disposition", "attachment; filename=high_scoring_applications.xlsx");
//     res.send(buffer);

//   } catch (error) {
//     console.error("Error scoring applications:", error);
//     next(new ErrorHandler("Failed to score applications and generate Excel file.", 500));
//   }
// };
