import { randomUUID } from 'node:crypto';
import { records, write, sameOrigin, rateLimit } from '@/lib/marketplace/store';
import { publicReview, type Review } from '@/lib/reviews';
export async function GET(){try {const reviews=(await records<Review>('reviews/submissions/')).filter(r=>r.status==='approved').sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(publicReview);return Response.json({reviews},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({message:'Reviews are temporarily unavailable.'},{status:503});}}
export async function POST(request:Request){try {
 if(!sameOrigin(request))return Response.json({message:'Please submit through this website.'},{status:403});
 const data=await request.json().catch(()=>null);
 if(!data||typeof data.name!=='string'||!data.name.trim()||data.name.length>100||typeof data.email!=='string'||data.email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||typeof data.service!=='string'||!data.service.trim()||data.service.length>120||!Number.isInteger(data.rating)||data.rating<1||data.rating>5||typeof data.feedback!=='string'||data.feedback.trim().length<10||data.feedback.length>1500||data.consent!==true)return Response.json({message:'Complete all fields, choose a rating, and agree to publication.'},{status:400});
 if(!await rateLimit(request,'reviews',60))return Response.json({message:'Please wait one minute before submitting again.'},{status:429});
 const item:Review={id:randomUUID(),name:data.name.trim(),service:data.service.trim(),rating:data.rating,feedback:data.feedback.trim(),createdAt:new Date().toISOString(),status:'pending',private:{email:data.email.trim()}};
 await write(`reviews/submissions/${item.id}.json`,item);return Response.json({message:'Thank you! Your review has been received and will appear after administrator approval.'},{status:201});
 }catch{return Response.json({message:'Unable to save your review. Please try again.'},{status:503});}}
