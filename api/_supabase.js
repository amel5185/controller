const BASE=(process.env.SUPABASE_URL||"").replace(/\/$/,"");
const KEY=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY||"";
async function db(path,opt={}){if(!BASE||!KEY){let e=Error("Atur SUPABASE_URL dan SUPABASE_SECRET_KEY di Vercel Environment Variables.");e.status=503;throw e}let r=await fetch(`${BASE}/rest/v1/${path}`,{...opt,headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,"Content-Type":"application/json",Prefer:"return=representation",...(opt.headers||{})}});let t=await r.text(),d=null;try{d=t?JSON.parse(t):null}catch{}if(!r.ok){let e=Error(d?.message||d?.hint||`Supabase HTTP ${r.status}`);e.status=r.status>=500?502:400;throw e}return d}
function json(res,s,d){res.status(s).setHeader("Cache-Control","no-store").json(d)}
function fail(res,e){json(res,e.status||500,{error:e.message||"Internal server error"})}
async function body(req){if(req.body&&typeof req.body==="object")return req.body;if(typeof req.body==="string"){try{return JSON.parse(req.body)}catch{}}return{}}
function token(n=32){return require("crypto").randomBytes(n).toString("base64url")}
function hash(v){return require("crypto").createHash("sha256").update(String(v)).digest("hex")}
function equal(a,b){let c=require("crypto"),x=Buffer.from(String(a||"")),y=Buffer.from(String(b||""));return x.length===y.length&&c.timingSafeEqual(x,y)}
async function get(id){let a=await db(`flashlight_commands?device_id=eq.${encodeURIComponent(id)}&select=*`,{method:"GET"});return a?.[0]||null}
module.exports={db,json,fail,body,token,hash,equal,get};