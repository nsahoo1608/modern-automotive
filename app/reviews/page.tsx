import type {Metadata} from 'next';
import CustomerReviews from '../components/CustomerReviews';
import ReviewForm from './ReviewForm';
export const metadata:Metadata={title:'Customer reviews',description:'Read customer experiences with Rashmi Ranjan Fin Solution and share feedback about your vehicle finance or service.',alternates:{canonical:'/reviews'}};
export default function Page(){return <main><div className="container reviews-intro"><p className="eyebrow">RRFIN CUSTOMER EXPERIENCES</p><h1>Your voice.<br />Our next step forward.</h1><p>Real feedback, published after review by our team.</p></div><CustomerReviews /><ReviewForm /></main>;}
