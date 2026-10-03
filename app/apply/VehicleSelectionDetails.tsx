"use client";
import Image from "next/image";
import { useState } from "react";
import type { VehicleBrand, VehicleModel, VehicleVariant } from "@/lib/vehicle-data/types";
import { brandDirectory } from "@/lib/vehicle-data/brand-directory";
import VehicleInteractiveView from "./VehicleInteractiveView";

export default function VehicleSelectionDetails({ name, model, variant }: { name: string; brand?: VehicleBrand; model?: VehicleModel; variant?: VehicleVariant }) {
  const [photo, setPhoto] = useState(0);
  const [failed, setFailed] = useState(false);
  const directory = brandDirectory.find(item => item.name === name);
  const images = [...(variant?.images || []), ...(model?.images || [])].filter((item, index, all) => all.findIndex(other => other.url === item.url) === index);
  const current = images[photo] || images[0];
  const specs = { Category: model?.category, 'Body type': model?.bodyType, Application: model?.application, Payload: model?.payload, Capacity: model?.capacity, 'Operating weight': model?.operatingWeight, 'Gross vehicle weight': model?.gvwKg ? `${model.gvwKg} kg` : undefined, Seating: model?.seatingCapacity, Fuel: variant?.fuel, Transmission: variant?.transmission, Engine: variant?.engine, Battery: variant?.battery, Power: variant?.power, Torque: variant?.torque, ...model?.specifications, ...variant?.specifications };
  const price = variant?.price;
  if (!name) return null;
  return <aside className="selection-details" aria-label="Official vehicle information">
    <div className="selection-heading"><div><span className="eyebrow">MANUFACTURER REFERENCE</span><h3>{model?.name || name}</h3><p>{variant?.name || 'Choose a model and variant to match your exact requirement.'}</p></div>{directory && <p>{directory.parentCompany}<br /><small>{directory.relationship}</small></p>}</div>
    {current && !failed ? <><div className="selection-photo"><Image src={current.url} alt={current.alt || model?.name || name} width={900} height={450} unoptimized onError={() => setFailed(true)} /></div><p className="image-caption">Original manufacturer image · appearance and equipment may vary by variant.</p>{images.length > 1 && <div className="selection-gallery">{images.map((item, index) => <button type="button" key={item.url} aria-label={`View vehicle image ${index + 1}`} aria-pressed={photo === index} onClick={() => { setPhoto(index); setFailed(false); }}><Image src={item.url} alt="" width={100} height={70} unoptimized /></button>)}</div>}</> : <p>Manufacturer imagery has not been supplied for this selection.</p>}
    {model && <VehicleInteractiveView modelUrl={model.model3dUrl} frames={model.rotationImages} name={model.name} />}
    {Object.values(specs).some(Boolean) && <dl className="selection-specs">{Object.entries(specs).filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label.replace(/([a-z])([A-Z])/g, '$1 $2')}</dt><dd>{value}</dd></div>)}</dl>}
    {!!variant?.colours?.length && <p>Manufacturer colours: {variant.colours.map(colour => colour.name).join(' · ')}. Mention your preferred colour in Additional Requirement.</p>}
    {price && <p>₹{price.amount.toLocaleString('en-IN')} · {price.type.replaceAll('-', ' ')}{price.city ? ` · ${price.city}` : ''}. Source checked {new Date(price.verifiedAt).toLocaleDateString('en-IN')}. Confirm current availability and final on-road price with the dealer.</p>}
    {model && !model.model3dUrl && !model.rotationImages?.length && <p>Interactive 3D / 360° assets are not available from this manufacturer for the selected model.</p>}
  </aside>;
}
