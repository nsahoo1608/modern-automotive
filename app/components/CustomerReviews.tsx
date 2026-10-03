"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import type {publicReview} from '@/lib/reviews';
type PublicReview=ReturnType<typeof publicReview>;
export default function CustomerReviews({preview=false}:{preview?:boolean}){
 const [reviews,setReviews]=useState<PublicReview[]>([]);const [state,setState]=useState('loading');
 useEffect(()=>{const controller=new AbortController();fetch('/api/reviews',{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error();const data=await r.json();setReviews(data.reviews);setState('ready');}).catch(()=>{if(!controller.signal.aborted)setState('error');});return()=>controller.abort();},[]);
 return <section className="container section-space customer-reviews"><div className="section-heading"><div><p className="eyebrow">YOUR EXPERIENCE MATTERS</p><h2>What our customers say.</h2></div>{preview?<Link className="text-link" href="/reviews">View all reviews ↗</Link>:<a className="text-link" href="#write-review">Write a review ↗</a>}</div>
 {state==='loading'?<p role="status">Loading customer reviews…</p>:state==='error'?<p role="status">Reviews are temporarily unavailable. Please try again later.</p>:reviews.length===0?<div className="review-empty"><h3>Be the first to share your experience.</h3><p>Your feedback helps us improve our service and helps other customers choose their next step.</p>{preview&&<Link className="button button-outline" href="/reviews#write-review">Write a review ↗</Link>}</div>:<div className="review-grid">{(preview?reviews.slice(0,3):reviews).map(r=><article className="review-card" key={r.id}><span className="review-stars" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span><blockquote>{r.feedback}</blockquote><div className="review-author"><span className="review-avatar" aria-hidden="true">{r.name.slice(0,1).toUpperCase()}</span><div><strong>{r.name}</strong><p>{r.service}</p><small>{new Date(r.createdAt).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</small></div></div></article>)}</div>}
 </section>;
}
