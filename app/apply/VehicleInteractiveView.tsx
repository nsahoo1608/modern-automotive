"use client";
import { createElement, useEffect, useState } from 'react';
import Image from 'next/image';
import type { VehicleImage } from '@/lib/vehicle-data/types';
export default function VehicleInteractiveView({modelUrl,frames,name}:{modelUrl?:string;frames?:VehicleImage[];name:string}){
 const [view,setView]=useState<'gallery'|'360'|'3d'>('gallery');const [frame,setFrame]=useState(0);const [ready,setReady]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{if(view!=='3d'||!modelUrl)return;let active=true;import('@google/model-viewer').then(()=>{if(active)setReady(true);}).catch(()=>{if(active)setError('The manufacturer 3D view could not load.');});return()=>{active=false;};},[view,modelUrl]);
 if(!modelUrl&&!frames?.length)return null;
 return <div className="interactive-vehicle"><div className="interactive-tabs">{frames?.length&&<button type="button" aria-pressed={view==='360'} onClick={()=>setView(view==='360'?'gallery':'360')}>360° manufacturer view</button>}{modelUrl&&<button type="button" aria-pressed={view==='3d'} onClick={()=>setView(view==='3d'?'gallery':'3d')}>Interactive 3D</button>}</div>{view==='360'&&frames&&<div><Image src={frames[frame].url} width={900} height={450} unoptimized alt={`${name}, rotation view ${frame+1}`} /><label>Rotate vehicle<input type="range" min={0} max={frames.length-1} value={frame} onChange={e=>setFrame(Number(e.target.value))} /></label><p>Move the slider to rotate through the manufacturer’s photographs.</p></div>}{view==='3d'&&(error?<p role="alert">{error}</p>:ready?createElement('model-viewer',{src:modelUrl,alt:`Manufacturer 3D model of ${name}`,'camera-controls':true,'touch-action':'pan-y',style:{width:'100%',height:420,background:'#edf2ef',borderRadius:12}}):<p role="status">Loading manufacturer 3D viewer…</p>)}</div>;
}
