import type { Metadata } from 'next';
import Marketplace from './Marketplace';
export const metadata:Metadata={title:'Second-hand vehicles',description:'Browse pre-owned vehicles, submit your vehicle for sale and make an offer through RRFIN.'};
export default function Page(){return <Marketplace />;}
