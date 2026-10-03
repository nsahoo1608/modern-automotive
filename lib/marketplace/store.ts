import 'server-only';
import { get, list, put } from '@vercel/blob';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
export type Listing = {
 id: string; status: 'pending' | 'available' | 'reserved' | 'sold' | 'rejected'; createdAt: string;
 title: string; category: string; brand: string; model: string; variant: string; year: number; price: number; kilometres: number; fuel: string; transmission: string; owners: string; city: string; district: string; description: string; photos: string[];
 ourOffer?: number; private: { seller: string; mobile: string; email: string; address: string };
};
export const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export const randomToken = () => randomBytes(32).toString('hex');
export async function read<T>(path: string): Promise<T | null> {
 const result = await get(path, { access: 'private', useCache: false });
 if (!result || !result.stream) return null;
 return new Response(result.stream).json() as Promise<T>;
}
export async function write(path: string, data: unknown) { return put(path, JSON.stringify(data), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 }); }
export async function records<T>(prefix: string): Promise<T[]> {
 let cursor: string | undefined; const paths: string[] = [];
 do { const page = await list({ prefix, limit: 1000, cursor }); paths.push(...page.blobs.map(b => b.pathname)); cursor = page.hasMore ? page.cursor : undefined; } while (cursor);
 const results = await Promise.all(paths.map(path => read<T>(path)));
 return results.filter(item => item !== null) as T[];
}
export function publicListing(item: Listing) {
 return { ourOffer: item.ourOffer, id: item.id, status: item.status, createdAt: item.createdAt, title: item.title, category: item.category, brand: item.brand, model: item.model, variant: item.variant, year: item.year, price: item.price, kilometres: item.kilometres, fuel: item.fuel, transmission: item.transmission, owners: item.owners, city: item.city, district: item.district, description: item.description, photos: item.photos.map((_, i) => `/api/second-hand/${item.id}/photos/${i}`) };
}
export async function isAdmin() {
 const token = (await cookies()).get('rrfin-admin')?.value;
 if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
 const session = await read<{ expires: number }>(`marketplace/sessions/${hash(token)}.json`);
 return !!session && session.expires > Date.now();
}
export function sameOrigin(request: Request) { return request.headers.get('origin') === new URL(request.url).origin; }
export async function rateLimit(request: Request, action: string, seconds: number) {
 const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'local';
 const path = `marketplace/rate/${hash(`${action}:${ip}`)}.json`;
 const previous = await read<{ time: number }>(path);
 if (previous && Date.now() - previous.time < seconds * 1000) return false;
 await write(path, { time: Date.now() }); return true;
}


