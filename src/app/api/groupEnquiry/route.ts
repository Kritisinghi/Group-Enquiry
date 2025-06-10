import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import yup from "yup";
import { groupEnquiryFormSchema } from "./validation.schema";

const dataFilePath = path.join(process.cwd(), "data", "submissions.json");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    try {
      await groupEnquiryFormSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        validationError.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        return NextResponse.json(
          { message: "Validation failed", errors },
          { status: 400 },
        );
      }
      throw validationError;
    }

    let existingData = [];

    try {
      const fileContents = await fs.readFile(dataFilePath, "utf8");
      existingData = fileContents ? JSON.parse(fileContents) : [];
    } catch (readError) {
      console.error("Error reading data", readError);
      return NextResponse.json(
        { message: "Error reading existing data." },
        { status: 500 },
      );
    }

    const submissionWithTimestamp = {
      timestamp: new Date().toISOString(),
      ...formData,
    };
    existingData.push(submissionWithTimestamp);
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(existingData, null, 2),
      "utf8",
    );

    return NextResponse.json(
      {
        message: "Group Enquiry submitted successfully!",
        data: submissionWithTimestamp,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      {
        message: "Internal server error.",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
