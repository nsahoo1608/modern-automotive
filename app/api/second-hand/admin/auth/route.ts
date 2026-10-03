import { randomInt } from 'node:crypto';
import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { adminMail } from '@/lib/marketplace/mail';
import { hash, randomToken, read, write, rateLimit, sameOrigin } from '@/lib/marketplace/store';
export async function POST(request: Request) {
 try {
  if(!sameOrigin(request)) return NextResponse.json({message:'Use this website to sign in.'},{status:403});
  const data=await request.json();
  if(data.action==='request') {
   if(!await rateLimit(request,'admin-code',60)) return NextResponse.json({message:'Wait one minute before requesting another code.'},{status:429});
   const challenge=randomToken(); const code=String(randomInt(100000,1000000));
   await adminMail('RRFIN administrator sign-in code',`Your RRFIN administrator code is ${code}. It expires in 10 minutes. Do not share this code.`);
   await write(`marketplace/auth/${hash(challenge)}.json`,{code:hash(code),expires:Date.now()+600000,attempts:0});
   return NextResponse.json({challenge,message:'A sign-in code was sent to the configured administrator email.'});
  }
  if(typeof data.challenge!=='string' || !/^[a-f0-9]{64}$/.test(data.challenge) || typeof data.code!=='string' || !/^\d{6}$/.test(data.code)) return NextResponse.json({message:'Enter the six-digit sign-in code.'},{status:400});
  if(!await rateLimit(request,'admin-verify',2)) return NextResponse.json({message:'Please wait two seconds before trying again.'},{status:429});
  const path=`marketplace/auth/${hash(data.challenge)}.json`;
  const auth=await read<{code:string;expires:number;attempts:number}>(path);
  if(!auth || auth.expires<Date.now() || auth.attempts>=5) return NextResponse.json({message:'Code expired. Request a new code.'},{status:401});
  if(auth.code!==hash(data.code)) { await write(path,{...auth,attempts:auth.attempts+1}); return NextResponse.json({message:'Incorrect code.'},{status:401}); }
  await del(path);
  const session=randomToken(); await write(`marketplace/sessions/${hash(session)}.json`,{expires:Date.now()+8*60*60*1000});
  const response=NextResponse.json({success:true}); response.cookies.set('rrfin-admin',session,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:28800}); return response;
 } catch {return NextResponse.json({message:'Administrator sign-in is temporarily unavailable.'},{status:503});}
}
export async function DELETE(request: Request) {
 if(!sameOrigin(request)) return NextResponse.json({message:'Invalid request.'},{status:403});
 const token=request.headers.get('cookie')?.match(/(?:^|;\s*)rrfin-admin=([a-f0-9]{64})(?:;|$)/)?.[1];
 if(token) await del(`marketplace/sessions/${hash(token)}.json`);
 const response=NextResponse.json({success:true});response.cookies.delete('rrfin-admin');return response;
}

