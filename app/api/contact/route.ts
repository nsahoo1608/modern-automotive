import { randomBytes } from 'node:crypto';
import { write, rateLimit, sameOrigin } from '@/lib/marketplace/store';
import { adminMail } from '@/lib/marketplace/mail';
export async function POST(request:Request){
 try{
  if(!sameOrigin(request))return Response.json({message:'Please send your enquiry through this website.'},{status:403});
  const data=await request.json().catch(()=>null);
  if(!data||typeof data.name!=='string'||!data.name.trim()||data.name.length>150||typeof data.email!=='string'||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||data.email.length>254||typeof data.subject!=='string'||!data.subject.trim()||data.subject.length>150||typeof data.message!=='string'||!data.message.trim()||data.message.length>4000||typeof data.reference!=='string'||data.reference.length>100||typeof data.mobile!=='string'||(data.mobile&&!/^[6-9]\d{9}$/.test(data.mobile))||data.consent!==true)return Response.json({message:'Enter your name, valid email, subject and message, and agree to be contacted.'},{status:400});
  if(!await rateLimit(request,'contact',60))return Response.json({message:'Please wait one minute before sending another enquiry.'},{status:429});
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
  const reference=`RRFIN-${day}-${randomBytes(6).toString('hex').toUpperCase()}`;
  const record={reference,name:data.name.trim(),email:data.email.trim(),mobile:data.mobile,subject:data.subject.trim(),relatedReference:data.reference.trim(),message:data.message.trim(),createdAt:new Date().toISOString(),notification:'pending'};
  await write(`contact/messages/${reference}.json`,record);
  try{await adminMail(`RRFIN contact enquiry ${reference}`,`Reference: ${reference}\nSubject: ${record.subject}\nRelated reference: ${record.relatedReference||'None'}\nName: ${record.name}\nEmail: ${record.email}\nMobile: ${record.mobile||'Not provided'}\n\n${record.message}`);await write(`contact/messages/${reference}.json`,{...record,notification:'sent'});}catch{console.error('Contact enquiry saved; inbox notification failed.',reference);await write(`contact/messages/${reference}.json`,{...record,notification:'failed'});}
  return Response.json({reference,message:'Your enquiry has been received. Our company team will contact you soon.'},{status:201});
 }catch{return Response.json({message:'Unable to save your enquiry. Please try again.'},{status:503});}
}
