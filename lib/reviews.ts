export type Review = { id:string; name:string; service:string; rating:number; feedback:string; createdAt:string; status:'pending'|'approved'|'rejected'; private:{email:string} };
export function publicReview(item:Review){return {id:item.id,name:item.name,service:item.service,rating:item.rating,feedback:item.feedback,createdAt:item.createdAt};}
