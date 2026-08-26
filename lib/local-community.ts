import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type LocalProject={id:string;slug:string;title:string;content:string;award:string;contributorName?:string;email?:string;createdAt:string;files:Array<{name:string;url:string;mimeType:string}>};
export type LocalMessage={id:string;slug:string;displayName:string;content:string;createdAt:string};
type Store={projects:LocalProject[];messages:LocalMessage[]};
const dataPath=path.join(process.cwd(),"data","community.json");
let writeQueue=Promise.resolve();
async function readStore():Promise<Store>{try{return JSON.parse(await readFile(dataPath,"utf8"))}catch{return{projects:[],messages:[]}}}
async function updateStore(change:(store:Store)=>void){writeQueue=writeQueue.then(async()=>{const store=await readStore();change(store);await mkdir(path.dirname(dataPath),{recursive:true});const temporary=`${dataPath}.tmp`;await writeFile(temporary,JSON.stringify(store,null,2),"utf8");await rename(temporary,dataPath)});await writeQueue}
export async function communityFor(slug:string){const store=await readStore();return{projects:store.projects.filter(item=>item.slug===slug).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),messages:store.messages.filter(item=>item.slug===slug).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))}}
export async function allProjects(){const store=await readStore();return store.projects.sort((a,b)=>b.createdAt.localeCompare(a.createdAt))}
export async function allContributors(){const store=await readStore();const names=new Map<string,{name:string;firstContribution:string;count:number}>();for(const project of store.projects){const name=project.contributorName?.trim();if(!name)continue;const existing=names.get(name);if(existing){existing.count+=1;if(project.createdAt<existing.firstContribution)existing.firstContribution=project.createdAt}else names.set(name,{name,firstContribution:project.createdAt,count:1})}return Array.from(names.values()).sort((a,b)=>a.firstContribution.localeCompare(b.firstContribution))}
export async function addMessage(message:LocalMessage){await updateStore(store=>store.messages.push(message))}
export async function addProject(project:LocalProject){await updateStore(store=>store.projects.push(project))}
