// Original Jenga-Code functional models. Logical timing, not transistor models.
const pin=(n,name,dir='in')=>({n:String(n),name,dir});
const seq=(names,outs=[])=>names.map((s,i)=>pin(i+1,s,outs.includes(i+1)?'out':'in'));
export const models={
 INPUT:{name:'Logic switch',group:'Sources & probes',pins:[pin(1,'Q','out')],value:'0'},
 CLOCK:{name:'Clock',group:'Sources & probes',pins:[pin(1,'CLK','out')],value:'1'},
 VCC:{name:'Logic HIGH / supply',group:'Sources & probes',pins:[pin(1,'VCC','out')],value:'5'},
 GND:{name:'Ground / logic LOW',group:'Sources & probes',pins:[pin(1,'GND','out')]},
 LED:{name:'Logic indicator',group:'Displays',pins:[pin(1,'IN')]},
 HEX:{name:'Hexadecimal display',group:'Displays',pins:seq(['D0','D1','D2','D3'])},
 PROBE:{name:'Scope probe',group:'Sources & probes',pins:[pin(1,'IN')]},
 NAND:{name:'2-input NAND',group:'Logic gates',pins:[pin(1,'A'),pin(2,'B'),pin(3,'Y','out')],gate:'nand'},
 AND:{name:'2-input AND',group:'Logic gates',pins:[pin(1,'A'),pin(2,'B'),pin(3,'Y','out')],gate:'and'},
 OR:{name:'2-input OR',group:'Logic gates',pins:[pin(1,'A'),pin(2,'B'),pin(3,'Y','out')],gate:'or'},
 XOR:{name:'2-input XOR',group:'Logic gates',pins:[pin(1,'A'),pin(2,'B'),pin(3,'Y','out')],gate:'xor'},
 NOT:{name:'Inverter',group:'Logic gates',pins:[pin(1,'A'),pin(2,'Y','out')],gate:'not'},
 '74HC00':{name:'Quad NAND · DIP14',group:'7400 series',pins:seq(['1A','1B','1Y','2A','2B','2Y','GND','3Y','3A','3B','4Y','4A','4B','VCC'],[3,6,8,11]),units:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]],gate:'nand',power:[14,7]},
 CD4011:{name:'Quad NAND · DIP14',group:'4000 series',pins:seq(['1A','1B','1Y','2Y','2A','2B','VSS','3A','3B','3Y','4Y','4A','4B','VDD'],[3,4,10,11]),units:[[1,2,3],[5,6,4],[8,9,10],[12,13,11]],gate:'nand',power:[14,7]},
 '74HC86':{name:'Quad XOR · DIP14',group:'7400 series',pins:seq(['1A','1B','1Y','2A','2B','2Y','GND','3Y','3A','3B','4Y','4A','4B','VCC'],[3,6,8,11]),units:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]],gate:'xor',power:[14,7]},
 CD4017:{name:'Decade counter · DIP16',group:'4000 series',pins:seq(['Q5','Q1','Q0','Q2','Q6','Q7','Q3','VSS','Q8','Q4','Q9','CARRY','INHIBIT','CLK','RESET','VDD'],[1,2,3,4,5,6,7,9,10,11,12]),power:[16,8]},
 '74HC595':{name:'8-bit shift register · DIP16',group:'7400 series',pins:seq(['QB','QC','QD','QE','QF','QG','QH','GND',"QH′",'/MR','SHCP','STCP','/OE','DS','QA','VCC'],[1,2,3,4,5,6,7,9,15]),power:[16,8]},
 '74HC161':{name:'4-bit counter · DIP16',group:'7400 series',pins:seq(['/CLR','CLK','A','B','C','D','ENP','GND','/LOAD','ENT','QD','QC','QB','QA','RCO','VCC'],[11,12,13,14,15]),power:[16,8]},
 R:{name:'Resistor',group:'Analogue',pins:[pin(1,'1'),pin(2,'2')],value:'1k',analog:true},
 C:{name:'Capacitor',group:'Analogue',pins:[pin(1,'+'),pin(2,'−')],value:'1u',analog:true},
 L:{name:'Inductor',group:'Analogue',pins:[pin(1,'1'),pin(2,'2')],value:'10m',analog:true},
 V:{name:'Voltage source',group:'Analogue',pins:[pin(1,'+'),pin(2,'−')],value:'DC 5',analog:true},
 I:{name:'Current source',group:'Analogue',pins:[pin(1,'+'),pin(2,'−')],value:'DC 1m',analog:true},
 D:{name:'Diode · generic silicon',group:'Analogue',pins:[pin(1,'A'),pin(2,'K')],analog:true},
 Q:{name:'NPN transistor · generic',group:'Analogue',pins:[pin(1,'C'),pin(2,'B'),pin(3,'E')],analog:true},
 OPAMP:{name:'Ideal op-amp · gain 100k',group:'Analogue',pins:[pin(1,'+'),pin(2,'−'),pin(3,'OUT')],analog:true},
 TRANSFORMER:{name:'Coupled inductors · ideal',group:'Analogue',pins:seq(['P+','P−','S+','S−']),value:'10m 10m 0.99',analog:true}
};
// Additional original functional package definitions.
models.CD4001={...models.CD4011,name:'Quad NOR · DIP14',gate:'nor'};
models['74HC08']={...models['74HC00'],name:'Quad AND · DIP14',gate:'and'};
models['74HC32']={...models['74HC00'],name:'Quad OR · DIP14',gate:'or'};
models['74HC04']={name:'Hex inverter · DIP14',group:'7400 series',pins:seq(['1A','1Y','2A','2Y','3A','3Y','GND','4Y','4A','5Y','5A','6Y','6A','VCC'],[2,4,6,8,10,12]),units:[[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]],gate:'not',power:[14,7]};
models.CD4013={name:'Dual D flip-flop · DIP14',group:'4000 series',pins:seq(['Q1','/Q1','CLK1','RESET1','D1','SET1','VSS','SET2','D2','RESET2','CLK2','/Q2','Q2','VDD'],[1,2,12,13]),power:[14,7]};
models['74HC138']={name:'3-to-8 decoder · DIP16',group:'7400 series',pins:seq(['A','B','C','/G2A','/G2B','G1','/Y7','GND','/Y6','/Y5','/Y4','/Y3','/Y2','/Y1','/Y0','VCC'],[7,9,10,11,12,13,14,15]),power:[16,8]};
models['74HC157']={name:'Quad 2-to-1 mux · DIP16',group:'7400 series',pins:seq(['SELECT','1A','1B','1Y','2A','2B','2Y','GND','3Y','3B','3A','4Y','4B','4A','/ENABLE','VCC'],[4,7,9,12]),power:[16,8]};
export function dimensions(c){const n=models[c.type].pins.length;return {w: n>4?150:110,h:Math.max(70,Math.ceil(n/2)*24+38)}}
export function pinPosition(c,n){const ps=models[c.type].pins,i=ps.findIndex(p=>p.n===String(n)),half=Math.ceil(ps.length/2),d=dimensions(c);return {x:c.x+(i<half?0:d.w),y:c.y+32+(i<half?i:i-half)*24}}
export function validateDoc(d){if(d?.netlistText!==undefined&&(typeof d.netlistText!=='string'||new TextEncoder().encode(d.netlistText).length>100000))throw Error('Invalid saved SPICE netlist');if(d?.useNetlist!==undefined&&typeof d.useNetlist!=='boolean')throw Error('Invalid netlist mode');if(d?.sourceFilename!==undefined&&(typeof d.sourceFilename!=='string'||d.sourceFilename.length>255))throw Error('Invalid source filename');if(!d||!['digital','analogue','cpu'].includes(d.mode)||typeof d.title!=='string'||d.title.length>160||d.version!==1||!Array.isArray(d.components)||!Array.isArray(d.wires))throw Error('Not a Jenga circuit version 1 project');if(d.components.length>180||d.wires.length>900)throw Error('Project exceeds the 180 component / 900 wire limit');const ids=new Set();for(const c of d.components){if(!models[c.type]||typeof c.id!=='string'||!/^c\d+$/.test(c.id)||ids.has(c.id)||!Number.isFinite(c.x)||!Number.isFinite(c.y)||c.x<0||c.y<0||c.x>5000||c.y>5000||String(c.value||'').length>160)throw Error('Invalid component');ids.add(c.id)}for(const w of d.wires){if(!Array.isArray(w)||w.length!==2)throw Error('Invalid wire');for(const p of w){const [id,n]=String(p).split(':');const c=d.components.find(c=>c.id===id);if(!c||!models[c.type].pins.some(p=>p.n===n))throw Error('Wire references an unknown pin')}}return d}
export function netGraph(doc){const parent={};const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));for(const c of doc.components)for(const p of models[c.type].pins)parent[c.id+':'+p.n]=c.id+':'+p.n;for(const [a,b] of doc.wires){if(a in parent&&b in parent)parent[find(a)]=find(b)}const groups={};for(const p in parent){const r=find(p);(groups[r]??=[]).push(p)}const nets=Object.values(groups);const map={};nets.forEach((pins,n)=>pins.forEach(p=>map[p]=n));return{nets,map}}
export const defaultCode=`; Z80 output counter. ROM 0000–7FFF, RAM 8000–FFFF.
; OUT (0),A updates LEDs; OUT (1),A prints a character.
        LD A,0
loop:   OUT (0),A
        INC A
        JP loop
`;
export function example(name){const d={version:1,title:name,mode:'digital',components:[],wires:[],code:defaultCode,spice:'.tran 10u 10m',notes:''};let i=0;const add=(type,x,y,value)=>{const c={id:'c'+(++i),type,x,y,value:value??models[type].value??''};d.components.push(c);return c.id};const wire=(a,p,b,q)=>d.wires.push([a+':'+p,b+':'+q]);
 if(name==='RC charging'||name==='RLC resonance'||name==='Diode rectifier'||name==='Transistor switch'||name==='Transformer'){d.mode='analogue';const v=add('V',70,100,name==='RC charging'?'PULSE(0 5 0 1u 1u 100m 200m)':'SIN(0 5 1000)'),r=add('R',290,100,'1k'),g=add('GND',100,350),probe=add('PROBE',610,100);wire(v,2,g,1);wire(v,1,r,1);
 if(name==='Transformer'){d.components.find(c=>c.id===r).value='10';const t=add('TRANSFORMER',480,100),load=add('R',740,240,'1k');wire(r,2,t,1);wire(t,2,g,1);wire(t,4,g,1);wire(t,3,load,1);wire(load,2,g,1);wire(t,3,probe,1);d.spice='.tran 2u 5m';}
 else if(name==='Transistor switch'){d.components.find(c=>c.id===v).value='PULSE(0 5 0 1u 1u 1m 2m)';d.components.find(c=>c.id===r).value='10k';const q=add('Q',490,180),s=add('V',300,340,'DC 5'),load=add('R',700,270,'1k');wire(r,2,q,2);wire(q,3,g,1);wire(q,1,load,2);wire(load,1,s,1);wire(s,2,g,1);wire(q,1,probe,1);d.spice='.tran 2u 6m';}
 else {const c=add('C',480,260,name==='RC charging'?'1u':'100n');wire(c,2,g,1);if(name==='Diode rectifier'){const di=add('D',480,90);wire(r,2,di,1);wire(di,2,c,1);wire(di,2,probe,1);const l=add('R',710,280,'10k');wire(l,1,c,1);wire(l,2,g,1);}else if(name==='RLC resonance'){d.components.find(c=>c.id===r).value='20';d.components.find(c=>c.id===v).value='PULSE(0 5 0 1n 1n 100m 200m)';const l=add('L',480,90,'10m');wire(r,2,l,1);wire(l,2,c,1);wire(l,2,probe,1);}else{wire(r,2,c,1);wire(c,1,probe,1);}d.spice='.tran 10u 10m';}d.notes='Edit component values, then Run analysis. Probe any numbered pin. SPICE runs locally in a dedicated worker.';return d;}
 if(name==='Z80 computer'){d.mode='cpu';d.notes='A real instruction emulator with fixed ROM/RAM and I/O mapping. This workspace is not a user-wireable CPU pin model.';return d;}
 if(name==='Blank digital'){return d}
 const hi=add('VCC',50,60),lo=add('GND',50,360),clk=add('CLOCK',50,190,'1');
 if(name==='4017 running lights'){const c=add('CD4017',280,70);wire(hi,1,c,16);wire(lo,1,c,8);wire(lo,1,c,13);wire(lo,1,c,15);wire(clk,1,c,14);[3,2,4,7,10,1,5,6,9,11].forEach((p,k)=>{const l=add('LED',570+(k%5)*130,80+Math.floor(k/5)*200);wire(c,p,l,1)});d.notes='Clock drives pin 14; inhibit (13) and reset (15) are LOW. Q0–Q9 advance on each rising edge.';}
 else if(name==='Binary counter'){const c=add('74HC161',300,100),h=add('HEX',650,120);wire(hi,1,c,16);wire(lo,1,c,8);[1,7,9,10].forEach(p=>wire(hi,1,c,p));[3,4,5,6].forEach(p=>wire(lo,1,c,p));wire(clk,1,c,2);[14,13,12,11].forEach((p,k)=>wire(c,p,h,k+1));d.notes='74HC161 with enable and /LOAD HIGH. The hexadecimal instrument reads QA–QD.';}
 else if(name==='Shift register'){const c=add('74HC595',300,90),s=add('INPUT',60,480,'1');wire(hi,1,c,16);wire(hi,1,c,10);wire(lo,1,c,8);wire(lo,1,c,13);wire(clk,1,c,11);wire(clk,1,c,12);wire(s,1,c,14);[15,1,2,3,4,5,6,7].forEach((p,k)=>{const l=add('LED',600+(k%4)*140,100+Math.floor(k/4)*220);wire(c,p,l,1)});d.notes='Click DS switch to change incoming data. Tied shift/latch clocks display the previous shift contents, as on the real register.';}
 else {const a=add('INPUT',60,480,'0'),b=add('INPUT',250,480,'1'),c=add(name==='NAND laboratory'?'CD4011':'74HC86',390,80),l=add('LED',730,110);wire(hi,1,c,14);wire(lo,1,c,7);wire(a,1,c,1);wire(b,1,c,2);wire(c,3,l,1);const unused=name==='NAND laboratory'?[5,6,8,9,12,13]:[4,5,9,10,12,13];unused.forEach(p=>wire(lo,1,c,p));d.notes='Click the two logic switches to test the gate. Numbered package pins are real connections; crossing lines do not create junctions.';}
 return d;
}
export const examples=['4017 running lights','Binary counter','NAND laboratory','XOR laboratory','Shift register','Z80 computer','RC charging','RLC resonance','Diode rectifier','Transistor switch','Transformer','Blank digital'];
