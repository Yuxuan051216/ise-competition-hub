import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type PublicFile = { id: string; name: string; mimeType: string | null; url: string };
export type PublicProject = { id:string; slug:string; title:string; content:string; award:string; contributorName:string|null; type:string; license:string|null; createdAt:string; files:PublicFile[] };
export type PublicMessage = { id:string; display_name:string; content:string; created_at:string };

type SubmissionRow = { id:string; title:string; content:string; award:string; contributor_name:string|null; type:string; license:string|null; created_at:string; competitions:{slug:string}|null; submission_files:Array<{id:string;original_name:string;mime_type:string|null}> };

const publicSubmissionSelect = "id,title,content,award,contributor_name,type,license,created_at,competitions!inner(slug),submission_files(id,original_name,mime_type)";

function mapProject(row: SubmissionRow): PublicProject {
  return { id:row.id, slug:row.competitions?.slug ?? "", title:row.title, content:row.content, award:row.award, contributorName:row.contributor_name, type:row.type, license:row.license, createdAt:row.created_at, files:(row.submission_files ?? []).map(file=>({id:file.id,name:file.original_name,mimeType:file.mime_type,url:`/api/submission-files/${file.id}`})) };
}

export async function getCommunity(slug:string) {
  const admin=getSupabaseAdmin();
  if(!admin)return{configured:false,projects:[] as PublicProject[],messages:[] as PublicMessage[]};
  const competition=await admin.from("competitions").select("id").eq("slug",slug).eq("status","approved").maybeSingle();
  if(competition.error)throw competition.error;
  if(!competition.data)return null;
  const [projects,messages]=await Promise.all([
    admin.from("submissions").select(publicSubmissionSelect).eq("competition_id",competition.data.id).eq("status","approved").order("created_at",{ascending:false}),
    admin.from("discussion_messages").select("id,display_name,content,created_at").eq("competition_id",competition.data.id).eq("status","approved").order("created_at",{ascending:false})
  ]);
  if(projects.error)throw projects.error;if(messages.error)throw messages.error;
  return{configured:true,projects:((projects.data??[]) as unknown as SubmissionRow[]).map(mapProject),messages:(messages.data??[]) as PublicMessage[]};
}

export async function getAllProjects(){
  const admin=getSupabaseAdmin();if(!admin)return[] as PublicProject[];
  const result=await admin.from("submissions").select(publicSubmissionSelect).eq("status","approved").order("created_at",{ascending:false});
  if(result.error)throw result.error;return((result.data??[]) as unknown as SubmissionRow[]).map(mapProject);
}

export async function getContributors(){
  const projects=await getAllProjects();const names=new Map<string,{name:string;firstContribution:string;count:number}>();
  for(const project of projects){const name=project.contributorName?.trim();if(!name)continue;const existing=names.get(name);if(existing){existing.count++;if(project.createdAt<existing.firstContribution)existing.firstContribution=project.createdAt}else names.set(name,{name,firstContribution:project.createdAt,count:1});}
  return Array.from(names.values()).sort((a,b)=>a.firstContribution.localeCompare(b.firstContribution));
}
