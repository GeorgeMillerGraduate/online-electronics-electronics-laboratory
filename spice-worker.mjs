import {Simulation} from './vendor/eecircuit-engine.mjs';
let sim;
onmessage=async({data})=>{try{sim??=new Simulation();await sim.start();sim.setNetList(data.netlist);const result=await sim.runSim();postMessage({type:'spice',result,errors:sim.getError(),info:sim.getInfo()})}catch(e){postMessage({type:'error',message:e.message})}};
