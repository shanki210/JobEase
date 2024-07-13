import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const genAI = new GoogleGenerativeAI("AIzaSyCr5wGS1cYHXdFFNWRemYmCtYM4Q_hsWpo");




export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !jobId ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    jobId,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);

// export const suggestCoverLetter = catchAsyncErrors(async (req, res, next) => {
//   try{
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return next(new ErrorHandler("Resume File Required!", 400));
//     }
  
//     const { resume } = req.files;
//     const allowedFormats = ["image/png", "image/jpeg", "application/pdf"];
//     if (!allowedFormats.includes(resume.mimetype)) {
//       return next(new ErrorHandler("Invalid file type. Please upload an image or PDF file.", 400));
//     }
  
//     const uploadResult = await fileManager.uploadFile(resume, {
//       mimeType: resume.mimetype,
//       displayName: "sample",
//     });
  
//     if (!uploadResult || uploadResult.error) {
//       console.error(
//         "File api Error:",
//         uploadResult.error || "Unknown File API error"
//       );
//       return next(new ErrorHandler("Failed to upload Resume to File API", 500));
//     }
  
//     const prompt = "Generate a cover letter based on the attached resume.";
  
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent([
//       {
//         fileData: {
//           mimeType: uploadFile.file.mimeType,
//           fileUri: uploadFile.file.uri
//         }
//       },
//       { text: "Generate a cover letter based on the attached resume." },
//     ]);
  
//     const response = await result.response;
//     const suggestedCoverLetter = await response.text();
  
//     await fileManager.deleteFile(uploadResult.file.name);
  
//     res.status(200).json({
//       success: true,
//       suggestedCoverLetter,
//     });
//   }catch(error){
//     console.log(error); 
//   }
  
 
// });


// 




function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data.split(",")[1], // Remove the data URL prefix
      mimeType
    },
  };
}

export const suggestCoverLetter = catchAsyncErrors(async (req, res, next) => {
  const { resume, mimeType } = req.body;

  if (!resume || !mimeType) {
    return next(new ErrorHandler("Resume file is required.", 400));
  }
  

  try {
    const prompt = "Generate a cover letter based on the attached resume.";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = [
      fileToGenerativePart(resume, mimeType)
    ];

    const result = await model.generateContent([prompt, ...imageParts]);

    const response =  await result.response;
    const suggestedCoverLetter = await response.text();

   

    res.status(200).json({
      success: true,
      suggestedCoverLetter,
    });

  } catch (error) {
    console.error("Error generating cover letter:", error);
    return next(new ErrorHandler("Failed to generate cover letter.", 500));
  }
});


