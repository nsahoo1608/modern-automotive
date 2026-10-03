import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/second-hand/admin','/second-hand/sell','/apply']},sitemap:'https://modern-automotive.vercel.app/sitemap.xml'};}

