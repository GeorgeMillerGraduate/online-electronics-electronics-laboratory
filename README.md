# Jenga Code · Electronics Laboratory

A standalone, static browser application in the Jenga-Code copper/cream editorial style. The original compass logo from the Lattice Explorer header is retained. No runtime CDN, account, server-side execution, API keys or shared-memory headers are needed.

## Install on jenga-code.com

Extract the ZIP into `public_html/apps/`. The resulting file must be:

`public_html/apps/electronics-laboratory/index.html`

The page address after uploading is `https://jenga-code.com/apps/electronics-laboratory/`.

Keep every file and subfolder together. The app uses relative asset/module/worker paths. The home page and applications catalogue are not modified by this package; add a link to `/apps/electronics-laboratory/` when ready.

For a local preview, run `START-CHROME.bat` on Windows (Python 3 required), or `python3 preview_server.py` elsewhere. The launcher selects an available address starting at http://127.0.0.1:8845/. Do not open index.html through file://; module workers need HTTP(S).

The ngspice bundle is about 20 MB uncompressed and loads only when an analogue analysis is requested. The larger source archives are for source/licence availability and are not downloaded by the application. Standard HTTP compression and caching can reduce transfer time. No pthreads, SharedArrayBuffer, COOP or COEP configuration is required.

## Working features

- An original explicit pin/net document format; wires are endpoint references, not inferred from drawing intersections.
- Searchable component cabinet; drag placement; pin-to-pin connections and branches; orthogonal automatic routing; component and wire deletion; zoom/fit; fullscreen.
- Component values, undo/redo, versioned JSON project download/open, local autosave, notes and sample CSV export.
- Digital functional simulation in a dedicated worker. HIGH/LOW/X/Z resolution, contention reporting, combinational settling, rising-edge sequential devices and supply pin checking.
- Gates, CD4001/CD4011/CD4013/CD4017, 74HC00/04/08/32/86/138/157/161/595, clock, switches, probes, logic indicators and a hexadecimal readout.
- ngspice 45.2 WebAssembly through EEcircuit-engine 1.8.0, in a separate worker. Schematic-to-SPICE generation for R, C, L, voltage/current sources, generic diode/NPN, ideal op-amp and coupled inductors. Custom complete netlists and .tran/.op/.dc/.ac analyses are accepted. Analyses can be cancelled and have a 30-second timeout.
- Five analogue and five digital examples plus a Z80 computer and blank circuit.
- Full Z80 instruction emulation through Lawrence Kesteloot's MIT core, with a smaller original two-pass teaching assembler, ROM binary import, instruction stepping, breakpoint, registers, recent memory/I/O operations, character terminal and RAM view.
- Scope plots actual simulated data. Digital voltages are nominal 0/5 V, not computed electrical voltages. Analogue cursor readings come from ngspice results. AC complex values are displayed as magnitude.

## Building a digital circuit

1. Select Blank digital or an example.
2. Open a component category and add a part. Drag its rectangular body to place it.
3. Click a numbered pin, then another numbered pin to connect them. Click an already-connected pin to branch that net. Crossing lines do not form junctions. Escape cancels the pending wire. Keyboard users can Tab to pins and use Enter/Space to connect them.
4. Wire IC VCC/VDD to Logic HIGH and GND/VSS to Ground. Tie unused inputs to a defined state. Switch components toggle when clicked.
5. Run, pause or step. Choose scope channels from any pin. The clock value is in virtual-time Hz; simulation is educational-speed rather than a calibrated wall-clock generator.
6. Select a component or wire to edit/delete it. Moving a component preserves connectivity. Topology/value edits reset the simulation; toggling a logic switch preserves sequential state.

## Analogue experiments

Open RC charging to start. Change R/C values in the inspector, select Run analysis, and inspect the trace with the measurement cursor. SPICE suffixes apply: `1k`, `10m`, `1u`, `100n`; SPICE `M` means milli, use `MEG` for mega.

A circuit needs a connected ground and a valid return path. Digital ICs cannot be placed in an analogue experiment. The op-amp is an ideal unsaturated voltage-controlled source with gain 100,000, not a powered op-amp device. Diode/transistor defaults are illustrative generic models, not guaranteed vendor models. Transformer values are `primary-inductance secondary-inductance coupling`.

Expand SPICE netlist & analysis to inspect generated node names. Tick Run edited netlist to use custom SPICE. Large result series are decimated to at most approximately 20,000 plotted/exported samples per channel to keep the UI responsive. No illustrative curve is substituted on solver failure.

## Z80 workspace

The computer's mapping is fixed: ROM 0000–7FFF, RAM 8000–FFFF, output byte on port 00 and character terminal on port 01. IN returns zero. Other output ports have no attached device. No ROMs are supplied or required. The bundled example is original assembly.

The teaching assembler supports the common forms shown by its source: register/immediate LD, BC/DE/HL/SP immediate loads, absolute A memory load/store, INC/DEC, JP/CALL conditions, JR NZ/Z/NC/C, DJNZ, unconditional RET, A arithmetic/logic, IN A,(n), OUT (n),A, PUSH/POP, NOP/HALT/DI/EI and accumulator rotates, plus ORG/DB/DW. Numbers may be decimal, `$hex`, `0xhex` or `hexH`. Not every Z80 assembly syntax/form is supported. Import a raw ROM binary up to 32 KiB for instructions not covered by the assembler.

Set a hexadecimal breakpoint to pause before executing that instruction; clear the field and set it again to remove the breakpoint. Reset preserves the configured breakpoint. The recent bus view records instruction-level memory/I/O callbacks and T-state accounting. It is not a pin-by-pin clock trace.

## Explicit boundaries

This is a working initial laboratory, not the complete multi-year EDA platform described in the research document. Digital, analogue and CPU domains are separate workspaces. No synchronized analogue/digital bridges, propagation-delay scheduler, custom IC editor, Verilog compiler, general RAM/ROM schematic components, floating-point physical chip ratings or transistor-accurate CPU internals are claimed.

The Z80 computer is fixed-board, not user-wireable through individual CPU bus pins. 6502, AVR, RP2040, RISC-V, 68000 and 32-bit computer support are not implemented. The modular document/worker structure leaves room for those engines without changing the visual design.

Automatic wire routing avoids component bodies where space permits. Wire crossing/overlap never implies a connection; only a shared endpoint/net does. Dense or overlapping component layouts may require moving components. Projects are capped at 180 components and 900 wires. The simulation state, scope history and breakpoints are not part of saved JSON. The circuit, values, notes, assembly source, imported ROM, edited/imported SPICE text, source filename and selected netlist mode are saved. Save downloaded projects for durable copies.

## Verification

Run with Node 20+:

`node tests/core.mjs`

`node tests/analogue.mjs`

44 core checks cover NAND/XOR/NOR/AND/OR truth vectors, decoder, mux, D flip-flop, counters, shift/latch operation, contention, document/net persistence, assembler errors, and a Z80 ROM→RAM→I/O→HALT program. Five real ngspice example runs verify finite outputs and successful analyses; the RC transient is checked against its analytical exponential with a 0.002 V tolerance (observed maximum error about 0.0000152 V).

Browser checks cover loading, digital run/pause, Z80 stepping, actual WASM RC analysis, connection editing and undo. These are focused checks, not exhaustive electrical or Z80 conformance certification.

## Sources and licences

See credits.html, CREDITS.md, ASSET-ATTRIBUTION.md, licences/ and source/. All original editable HTML/CSS/JS is included. Third-party bundles retain their licences. Source/build material is provided alongside the application. There are no commercial game ROMs or downloaded vendor SPICE models.


## SPICE file import (edition 2)

Use **Load SPICE file** in the document toolbar to open `.cir`, `.sp`, `.net` or `.spice` text files up to 100 KB. Loading switches to the analogue bench and shows a structural component inventory and analysis directives. It does not generate a schematic or infer a circuit's purpose. There is no claim of KiCad, LTspice `.asc`, or vendor-specific SPICE dialect compatibility.

Imported circuits run directly through ngspice, without requiring any components or ground in the visual editor. Keep the SPICE ground node `0` in the file's actual circuit. Review the text, then press **Run analysis**. The first line is a SPICE title. Put `.tran`, `.op`, `.dc` or `.ac` inside the imported text; the schematic analysis field is disabled in imported mode. Files with multiple analyses/control blocks may need simplifying to one analysis per run. Unsupported device models or dialect extensions can produce ngspice errors.

External `.include` and `.lib` files are not automatically loaded; inline dependencies unless the model is already bundled with the engine. Loading is local and does not upload the circuit to a server. Use **Download netlist .cir** to export edits, or **Save project** to save the imported netlist inside the Jenga JSON project. Local autosave and JSON reopen retain the text and selected netlist mode. Switching to an example replaces the active experiment; use Undo or reopen your saved project to return.

`examples/rc-filter.cir` is an original runnable example. A component inventory is not a circuit explanation or an electrical safety assessment.
