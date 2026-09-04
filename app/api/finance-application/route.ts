import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    } = data;

    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name and mobile are required." },
        { status: 400 }
      );
    }

    const financeTeamEmail = process.env.FINANCE_TEAM_EMAIL;

    if (!financeTeamEmail) {
      return NextResponse.json(
        { success: false, message: "Finance team email is not configured." },
        { status: 500 }
      );
    }

    const applicationTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: financeTeamEmail,
      subject: `New Vehicle Finance Application - ${name}`,
      html: `
        <h2>New Vehicle Finance Application</h2>

        <p><strong>Application Time:</strong> ${applicationTime}</p>

        <h3>Applicant Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>

        <h3>Vehicle / Finance Details</h3>
        <p><strong>City:</strong> ${city || "Not provided"}</p>
        <p><strong>State:</strong> ${state || "Not provided"}</p>
        <p><strong>Category:</strong> ${category || "Not provided"}</p>
        <p><strong>Condition:</strong> ${condition || "Not provided"}</p>
        <p><strong>Vehicle Price:</strong> ${price || "Not provided"}</p>
        <p><strong>Loan Required:</strong> ${loan || "Not provided"}</p>

        <h3>Location Details</h3>
        <p><strong>Address:</strong> ${address || "Not provided"}</p>
        <p><strong>Village:</strong> ${village || "Not provided"}</p>
        <p><strong>Ward:</strong> ${ward || "Not provided"}</p>
        <p><strong>Police Station:</strong> ${policeStation || "Not provided"}</p>
        <p><strong>Panchayat:</strong> ${panchayat || "Not provided"}</p>
        <p><strong>NAC:</strong> ${nac || "Not provided"}</p>
        <p><strong>Municipality:</strong> ${municipality || "Not provided"}</p>
        <p><strong>District:</strong> ${district || "Not provided"}</p>
        <p><strong>Pincode:</strong> ${pincode || "Not provided"}</p>

        <h3>Additional Message</h3>
        <p>${message || "No additional message."}</p>
      `,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send finance application email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Finance application submitted successfully.",
    });
  } catch (error) {
    console.error("Finance application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the application.",
      },
      { status: 500 }
    );
  }
}