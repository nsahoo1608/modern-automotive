import { notFound } from 'next/navigation';
import { read, publicListing, type Listing } from '@/lib/marketplace/store';
import VehicleDetail from '../VehicleDetail';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!/^[a-f0-9-]{36}$/.test(id))notFound();const item=await read<Listing>(`marketplace/listings/${id}.json`);if(!item||!['available','reserved','sold'].includes(item.status))notFound();return <VehicleDetail vehicle={publicListing(item)} />;}
