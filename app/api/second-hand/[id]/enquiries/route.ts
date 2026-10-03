import { randomUUID } from 'node:crypto';
import { read, write, rateLimit, sameOrigin, type Listing } from '@/lib/marketplace/store';
export async function POST(request: Request,{params}:{params:Promise<{id:string}>}) {
 try {
  if(!sameOrigin(request)) return Response.json({message:'Please use the website enquiry form.'},{status:403});
  const {id}=await params;
  if(!/^[a-f0-9-]{36}$/.test(id)) return Response.json({message:'Vehicle unavailable.'},{status:404});
  const listing=await read<Listing>(`marketplace/listings/${id}.json`);
  if(!listing || !['available','reserved'].includes(listing.status)) return Response.json({message:'This vehicle is unavailable for enquiries.'},{status:404});
  const data=await request.json();
  if(data.consent!=='on' || typeof data.name!=='string' || !data.name.trim() || data.name.length>150 || typeof data.mobile!=='string' || !/^[6-9]\d{9}$/.test(data.mobile) || !['inspection','offer','finance'].includes(data.type) || typeof data.message!=='string' || data.message.length>2000 || (data.type==='offer' && (!Number.isFinite(Number(data.offer)) || Number(data.offer)<=0))) return Response.json({message:'Enter your name, valid mobile number and enquiry details.'},{status:400});
  if(!await rateLimit(request,'enquiry',30)) return Response.json({message:'Please wait 30 seconds before sending another enquiry.'},{status:429});
  const enquiryId=randomUUID();
  await write(`marketplace/enquiries/${enquiryId}.json`,{id:enquiryId,listingId:id,vehicle:listing.title,name:data.name,mobile:data.mobile,type:data.type,message:data.message,offer:data.type==='offer'?Number(data.offer):null,createdAt:new Date().toISOString()});
  return Response.json({message:'Enquiry received. The administrator will contact you to arrange the next step.'},{status:201});
 } catch {return Response.json({message:'Unable to save your enquiry. Please try again.'},{status:503});}
}
