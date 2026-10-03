import { manufacturerSources } from '@/lib/vehicle-data/manufacturers';
import { manufacturerAdapters } from '@/lib/vehicle-data/adapters';
import { manufacturerModels, manufacturerModelDetails, manufacturerCategory } from '@/lib/vehicle-data/adapters/live-catalogue';
import { vehicleCategoryNames } from '@/lib/vehicle-data/categories';
import type { VehicleType } from '@/lib/vehicle-data/types';
export const maxDuration=45;
export async function GET(request:Request){
 const query=new URL(request.url).searchParams;const id=query.get('brand')||'';const source=manufacturerSources.find(s=>s.id===id);if(!source)return Response.json({message:'Unknown vehicle brand.'},{status:400});
 const requested=query.get('category');const category=(vehicleCategoryNames.includes(requested as VehicleType)?requested:manufacturerCategory(id)) as VehicleType;
 try{let models=manufacturerAdapters[id]?.mode!=='official-directory'?(await manufacturerAdapters[id].fetchCatalog()).brands.flatMap(b=>b.models).filter(m=>m.category===category):[];
  if(!models.length)models=await manufacturerModels(id,category);
  const modelId=query.get('model');if(modelId){const model=models.find(m=>m.id===modelId);if(!model)return Response.json({message:'Model is unavailable in this catalogue.'},{status:404});return Response.json({model:await manufacturerModelDetails(id,model)});}
  return Response.json({brand:{id,name:source.name,officialUrl:source.vehicleUrl||source.officialUrl,models},message:models.length?'':'This manufacturer does not expose usable model data to our adapter yet.'});
 }catch{return Response.json({message:'The manufacturer connection is unavailable. Retry the catalogue shortly.'},{status:503});}
}
