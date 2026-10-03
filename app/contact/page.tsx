import type { Metadata } from 'next';
import ContactForm from './ContactForm';
export const metadata:Metadata={title:'Contact us',description:'Contact the RRFIN team about vehicle finance or second-hand vehicles. Receive a unique enquiry reference number.'};
export default function Page(){return <ContactForm />;}
