import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { put, del } from '@vercel/blob';
import sharp from 'sharp';
import { type Listing, records, read, write, publicListing, rateLimit, sameOrigin } from '@/lib/marketplace/store';
import { vehicleCategoryNames } from '@/lib/vehicle-data/categories';
export const runtime = 'nodejs';
export async function GET() {
 try { const items = await records<Listing>('marketplace/listings/'); return NextResponse.json({ monthlyOffer: (await read<{ monthlyOffer: string }>("marketplace/settings.json"))?.monthlyOffer || "", listings: items.filter(i => ['available', 'reserved', 'sold'].includes(i.status)).sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map(publicListing) }, { headers: { 'Cache-Control': 'no-store' } }); }
 catch { return NextResponse.json({ message: 'Vehicle listings could not load. Please try again.' }, { status: 503 }); }
}
export async function POST(request: Request) {
 const uploaded: string[] = [];
 try {
  if (!sameOrigin(request)) return NextResponse.json({ message: 'Please submit through this website.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 4_000_000) return NextResponse.json({ message: 'Photos must total less than 3.5 MB.' }, { status: 413 });
  const form = await request.formData();
  const text = (key: string, max = 150) => String(form.get(key) || '').trim().slice(0,max);
  const fields = { title: text('title'), category: text('category'), brand: text('brand'), model: text('model'), variant: text('variant'), year: Number(text('year')), price: Number(text('price')), kilometres: Number(text('kilometres')), fuel: text('fuel'), transmission: text('transmission'), owners: text('owners'), city: text('city'), district: text('district'), description: text('description',2500) };
  const contact = { seller: text('seller'), mobile: text('mobile'), email: text('email'), address: text('address',500) };
  const photos = form.getAll('photos').filter((p): p is File => p instanceof File);
  if (!fields.title || !fields.brand || !fields.model || !fields.city || !vehicleCategoryNames.includes(fields.category as typeof vehicleCategoryNames[number]) || !contact.seller || !contact.address || !/^[6-9]\d{9}$/.test(contact.mobile) || (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) || !Number.isInteger(fields.year) || fields.year < 1950 || fields.year > new Date().getFullYear()+1 || !Number.isFinite(fields.price) || fields.price <= 0 || fields.price > 1e9 || !Number.isFinite(fields.kilometres) || fields.kilometres < 0 || fields.kilometres > 1e7 || form.get('consent') !== 'on') return NextResponse.json({ message: 'Check the required vehicle, contact and consent fields.' }, { status: 400 });
  if (!photos.length || photos.length > 8 || photos.some(p => !['image/jpeg','image/png','image/webp'].includes(p.type)) || photos.reduce((sum,p) => sum+p.size,0) > 3_500_000) return NextResponse.json({ message: 'Add 1–8 JPG, PNG or WebP photos, total below 3.5 MB.' }, { status: 400 });
  if (!await rateLimit(request,'listing',60)) return NextResponse.json({ message: 'Please wait one minute before submitting another vehicle.' }, { status: 429 });
  const id = randomUUID();
  for (let i=0;i<photos.length;i++) {
   const image = await sharp(Buffer.from(await photos[i].arrayBuffer()),{ limitInputPixels: 40_000_000 }).rotate().resize(1600,1200,{ fit:'inside',withoutEnlargement:true }).webp({ quality:82 }).toBuffer();
   const result = await put(`marketplace/photos/${id}/${i}.webp`,image,{access:'private',addRandomSuffix:false,contentType:'image/webp'}); uploaded.push(result.pathname);
  }
  const listing: Listing = { id, ...fields, private:contact, photos:uploaded, status:'pending', createdAt:new Date().toISOString() };
  await write(`marketplace/listings/${id}.json`,listing);
  return NextResponse.json({ id, message:'Vehicle submitted. The administrator will review the details and photos before publishing.' },{status:201});
 } catch { if(uploaded.length) await del(uploaded).catch(()=>{}); return NextResponse.json({message:'Unable to submit your vehicle. Please check the photos and try again.'},{status:503}); }
}


