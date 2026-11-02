import {models,netGraph} from './models.mjs';
const gate=(name,v)=>{if(name==='not')return v[0]===0?1:v[0]===1?0:'X';if(name==='and'||name==='nand'){const a=v.includes(0)?0:v.every(x=>x===1)?1:'X';return name==='nand'?(a==='X'?a:1-a):a}if(name==='nor'){const a=gate('or',v);return a==='X'?'X':1-a}if(name==='or')return v.includes(1)?1:v.every(x=>x===0)?0:'X';return v.every(x=>x===0||x===1)?v.reduce((a,b)=>a^b,0):'X'};
export class Digital{
 constructor(doc){this.doc=doc;this.graph=netGraph(doc);this.time=0;this.state={};this.values=Array(this.graph.nets.length).fill('Z');this.outputs={};this.warnings=[];this.settle();}
 get(c,p){return this.values[this.graph.map[c.id+':'+p]]??'Z'}
 powered(c){const m=models[c.type];return !m.power||(this.get(c,m.power[0])===1&&this.get(c,m.power[1])===0)}
 drive(out,c,p,v){out[c.id+':'+p]=v}
 evaluate(){const out={};for(const c of this.doc.components){const m=models[c.type],s=this.state[c.id]??={count:0,shift:0,latch:0,prev:0,lprev:0};const put=(p,v)=>this.drive(out,c,p,v);const get=p=>this.get(c,p);if(c.type==='INPUT')put(1,Number(c.value)?1:0);else if(c.type==='CLOCK')put(1,Math.floor((this.time+1e-10)*Math.max(0.001,Number(c.value)||1)*2)%2);else if(c.type==='VCC')put(1,1);else if(c.type==='GND')put(1,0);else if(!this.powered(c)){for(const p of m.pins)if(p.dir==='out')put(p.n,'X')}
 else if(m.gate){for(const u of m.units??[m.pins.map(p=>+p.n)])put(u.at(-1),gate(m.gate,u.slice(0,-1).map(get)))}
 else if(c.type==='CD4013'){put(1,s.q1??0);put(2,s.q1==='X'?'X':1-(s.q1??0));put(13,s.q2??0);put(12,s.q2==='X'?'X':1-(s.q2??0))}
 else if(c.type==='74HC138'){const enabled=get(4)===0&&get(5)===0&&get(6)===1;const valid=[1,2,3,4,5,6].every(p=>[0,1].includes(get(p)));const val=get(1)+2*get(2)+4*get(3);[15,14,13,12,11,10,9,7].forEach((p,k)=>put(p,!valid?'X':enabled&&k===val?0:1))}
 else if(c.type==='74HC157'){for(const[a,b,y]of[[2,3,4],[5,6,7],[11,10,9],[14,13,12]])put(y,get(15)===1?0:get(15)===0&&[0,1].includes(get(1))?get(get(1)===1?b:a):'X')}
 else if(c.type==='CD4017'){const pins=[3,2,4,7,10,1,5,6,9,11];pins.forEach((p,k)=>put(p,+(s.count===k)));put(12,+(s.count<5))}
 else if(c.type==='74HC161'){[14,13,12,11].forEach((p,k)=>put(p,(s.count>>k)&1));put(15,+(s.count===15&&get(10)===1))}
 else if(c.type==='74HC595'){[15,1,2,3,4,5,6,7].forEach((p,k)=>put(p,get(13)===0?(s.latch>>k)&1:'Z'));put(9,(s.shift>>7)&1)}
 }return out}
 settle(){let stable=false;for(let i=0;i<40;i++){const out=this.evaluate(),vals=this.graph.nets.map(ps=>{const v=ps.filter(p=>p in out).map(p=>out[p]).filter(v=>v!=='Z');return !v.length?'Z':v.includes('X')||v.some(x=>x!==v[0])?'X':v[0]});stable=vals.every((v,n)=>v===this.values[n]);this.values=vals;this.outputs=out;if(stable)break}this.warnings=[];if(!stable)this.warnings.push('Combinational circuit did not settle; check feedback.');if(this.values.includes('X'))this.warnings.push('X: conflicting drivers, unpowered IC, unknown input or oscillation.');if(!stable)this.values=this.values.map(()=> 'X');return this.snapshot()}
 step(dt){this.time+=dt;this.settle();for(const c of this.doc.components){if(!this.powered(c))continue;const s=this.state[c.id],get=p=>this.get(c,p);if(c.type==='CD4013'){for(const [q,clk,r,d,set]of[['q1',3,4,5,6],['q2',11,10,9,8]]){const now=get(clk);if(get(r)===1&&get(set)===1)s[q]='X';else if(get(r)===1)s[q]=0;else if(get(set)===1)s[q]=1;else if(now===1&&(s[q+'prev']??0)===0)s[q]=[0,1].includes(get(d))?get(d):'X';s[q+'prev']=now}}
 if(c.type==='CD4017'){const clk=get(14);if(get(15)===1)s.count=0;else if(clk===1&&s.prev===0&&get(13)===0)s.count=(s.count+1)%10;s.prev=clk}
 if(c.type==='74HC161'){const clk=get(2);if(get(1)===0)s.count=0;else if(clk===1&&s.prev===0){if(get(9)===0)s.count=[3,4,5,6].reduce((n,p,k)=>n|((get(p)===1?1:0)<<k),0);else if(get(7)===1&&get(10)===1)s.count=(s.count+1)&15}s.prev=clk}
 if(c.type==='74HC595'){const clk=get(11),l=get(12),old=s.shift;if(get(10)===0)s.shift=0;else if(clk===1&&s.prev===0)s.shift=((s.shift<<1)|(get(14)===1?1:0))&255;if(l===1&&s.lprev===0)s.latch=old;s.prev=clk;s.lprev=l}
 }return this.settle()}
 snapshot(){const pins={};for(const [p,n]of Object.entries(this.graph.map))pins[p]=this.values[n];return{time:this.time,pins,warnings:this.warnings,states:this.state}}
}
