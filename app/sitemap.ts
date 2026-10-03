import type {MetadataRoute} from 'next';
import {records,type Listing} from '@/lib/marketplace/store';
export const dynamic = 'force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base='https://modern-automotive.vercel.app';const pages=['','/vehicles','/brands','/second-hand','/contact','/reviews'].map(route=>({url:base+route}));
 try{const listings=await records<Listing>('marketplace/listings/');return [...pages,...listings.filter(v=>['available','reserved'].includes(v.status)).map(v=>({url:`${base}/second-hand/${v.id}`}))];}catch{return pages;}
}

