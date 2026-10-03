import { isAdmin, records, read, write, sameOrigin, type Listing } from '@/lib/marketplace/store';
export async function GET() {
 try { if(!await isAdmin()) return Response.json({message:'Administrator sign-in required.'},{status:401});
 return Response.json({listings:await records<Listing>('marketplace/listings/'),enquiries:await records('marketplace/enquiries/'),settings:await read('marketplace/settings.json')},{headers:{'Cache-Control':'private, no-store'}});
 } catch {return Response.json({message:'Unable to load administrator data.'},{status:503});}
}
export async function PATCH(request: Request) {
 try {
  if(!sameOrigin(request) || !await isAdmin()) return Response.json({message:'Administrator sign-in required.'},{status:401});
  const data=await request.json();
  if(data.action==='settings') {
   if(typeof data.monthlyOffer!=='string' || data.monthlyOffer.length>250) return Response.json({message:'Offer text must be under 250 characters.'},{status:400});
   await write('marketplace/settings.json',{monthlyOffer:data.monthlyOffer.trim()});return Response.json({success:true});
  }
  if(typeof data.id!=='string' || !/^[a-f0-9-]{36}$/.test(data.id) || !['available','reserved','sold','rejected'].includes(data.status)) return Response.json({message:'Invalid listing update.'},{status:400});
  const item=await read<Listing>(`marketplace/listings/${data.id}.json`);if(!item)return Response.json({message:'Listing not found.'},{status:404});
  const offer=data.ourOffer===''?undefined:Number(data.ourOffer);
  if(offer!==undefined && (!Number.isFinite(offer) || offer<=0 || offer>1e9))return Response.json({message:'Enter a valid offer price.'},{status:400});
  await write(`marketplace/listings/${data.id}.json`,{...item,status:data.status,ourOffer:offer});return Response.json({success:true});
 }catch{return Response.json({message:'Unable to update listing.'},{status:503});}
}
