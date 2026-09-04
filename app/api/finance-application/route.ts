import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      mobile,
      email,
      city,
      state,
      category,
      brand,
      model,
      condition,
      price,
      loan,
      message,
      address,
      village,
      ward,
      policeStation,
      panchayat,
      nac,
      municipality,
      district,
      pincode,
      latitude,
      longitude,
    } = data;

    if (!name?.trim() || !mobile || mobile.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and valid 10-digit mobile number are required.",
        },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const mailFrom = process.env.MAIL_FROM;
    const mailTo = process.env.MAIL_TO;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !mailFrom ||
      !mailTo
    ) {
      console.error("SMTP configuration is incomplete.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const applicationTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const applicantEmail = email?.trim() || "";

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      ...(applicantEmail ? { replyTo: applicantEmail } : {}),
      subject: `New Vehicle Finance Application - ${name}`,

      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:800px">

          <h2 style="color:#168b5b">
            New Vehicle Finance Application
          </h2>

          <p>
            <strong>Application Time:</strong>
            ${escapeHtml(applicationTime)}
          </p>

          <hr />

          <h3>Applicant Details</h3>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Mobile:</strong> +91-${escapeHtml(mobile)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>

          <h3>Vehicle / Finance Details</h3>

          <p><strong>Vehicle Type:</strong> ${escapeHtml(category || "Not provided")}</p>
          <p><strong>Brand:</strong> ${escapeHtml(brand || "Not provided")}</p>
          <p><strong>Model:</strong> ${escapeHtml(model || "Not provided")}</p>
          <p><strong>Condition:</strong> ${escapeHtml(condition || "Not provided")}</p>
          <p><strong>Vehicle Price:</strong> ${escapeHtml(price || "Not provided")}</p>
          <p><strong>Loan Required:</strong> ${escapeHtml(loan || "Not provided")}</p>

          <h3>Location Details</h3>

          <p><strong>Address:</strong> ${escapeHtml(address || "Not provided")}</p>
          <p><strong>Village / Locality:</strong> ${escapeHtml(village || "Not provided")}</p>
          <p><strong>Ward:</strong> ${escapeHtml(ward || "Not provided")}</p>
          <p><strong>Police Station:</strong> ${escapeHtml(policeStation || "Not provided")}</p>
          <p><strong>Panchayat:</strong> ${escapeHtml(panchayat || "Not provided")}</p>
          <p><strong>NAC / Town:</strong> ${escapeHtml(nac || "Not provided")}</p>
          <p><strong>Municipality:</strong> ${escapeHtml(municipality || "Not provided")}</p>
          <p><strong>District:</strong> ${escapeHtml(district || "Not provided")}</p>
          <p><strong>State:</strong> ${escapeHtml(state || "Not provided")}</p>
          <p><strong>PIN Code:</strong> ${escapeHtml(pincode || "Not provided")}</p>

          <h3>GPS Location</h3>

          <p><strong>Latitude:</strong> ${escapeHtml(latitude || "Not available")}</p>
          <p><strong>Longitude:</strong> ${escapeHtml(longitude || "Not available")}</p>

          <h3>Additional Requirement</h3>

          <p>${escapeHtml(message || "No additional message.")}</p>

          <hr />

          <p style="color:#777;font-size:12px">
            This application was submitted through
            RASHMI RANJAN FIN SOLUTION.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Finance application submitted successfully. Our finance team will contact you shortly.",
    });
  } catch (error) {
    console.error("Finance application email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the application.",
      },
      { status: 500 }
    );
  }
}
