import { get } from '@vercel/blob';
import { isAdmin, read, type Listing } from '@/lib/marketplace/store';
export async function GET(_: Request, { params }: { params: Promise<{ id:string; photo:string }> }) {
 const {id,photo}=await params;
 if(!/^[a-f0-9-]{36}$/.test(id) || !/^[0-7]$/.test(photo)) return new Response('Not found',{status:404});
 const listing=await read<Listing>(`marketplace/listings/${id}.json`);
 if(!listing || (!['available','reserved','sold'].includes(listing.status) && !await isAdmin())) return new Response('Not found',{status:404});
 const path=listing.photos[Number(photo)]; if(!path) return new Response('Not found',{status:404});
 const result=await get(path,{access:'private'}); if(!result?.stream) return new Response('Not found',{status:404});
 return new Response(result.stream,{headers:{'Content-Type':'image/webp','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}
