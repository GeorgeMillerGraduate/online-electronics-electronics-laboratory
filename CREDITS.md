# Engines, sources and attribution

## Original Jenga-Code application

The document model, SVG renderer/router, original functional IC definitions, digital simulation, two-pass teaching assembler, worker adapters, scope/meter, UI, examples and documentation were created for this application. The compass/header follows the site's existing Lattice Explorer header. Original application code is provided under MIT; see LICENSE.txt. No electrical symbol collection was copied.

## EEcircuit-engine 1.8.0

- Author: Danial Chitnis and contributors.
- Project: https://github.com/eelab-dev/EEcircuit-engine
- npm: https://www.npmjs.com/package/eecircuit-engine/v/1.8.0
- Package gitHead: f4dab6458d3865a1db9766008480690d23410c3a.
- Licence of wrapper/application: MIT, in licences/EEcircuit-engine-MIT.txt.
- `vendor/eecircuit-engine.mjs` is the unmodified npm package's ES module, including its embedded WASM and model files. SHA-256 values are in source/manifest.json.
- Exact wrapper source snapshot: source/EEcircuit-engine-1.8.0-source.tar.gz. Upstream build scripts and patches are also provided unmodified under source/EEcircuit-build/.

## ngspice 45.2

- Project: https://ngspice.sourceforge.io/ and https://github.com/danchitnis/ngspice-sf-mirror
- Source tag: ngspice-45.2, bundled in source/ngspice-45.2-source.tar.gz.
- Runtime banner identifies ngspice-45.2, KLU, creation date 5 September 2026.
- This application uses the prebuilt WASM distributed by EEcircuit-engine, without changing it. It was not rebuilt in this task. The upstream tag source and wrapper build/patch scripts are included for source availability; a bit-identical rebuild has not been verified. The upstream build selects toolchain versions dynamically, so future rebuilds require pinning Emscripten and reviewing the build configuration.
- The ngspice distribution has mixed licences. Its COPYING file is reproduced in licences/ngspice-COPYING.txt; additional LGPL and GPL texts are provided. Source-file notices in the included source archive take precedence over a shorthand project-wide licence description. In particular, KLU/numparam include LGPL material; do not relabel the entire engine MIT.
- Bundled process-model text retains its existing notices in the unmodified engine module and wrapper source. These include Apache-2.0 GlobalFoundries models and the upstream SkyWater/other model notices. The complete Apache-2.0 text is supplied. The UI examples use original generic diode/NPN definitions rather than redistributing a vendor-download model.

## Z80 emulator 2.3.0 and z80-base 2.0.1

- Author: Lawrence Kesteloot.
- Project: https://github.com/lkesteloot/trs80
- Licences: MIT, reproduced in licences/ and vendor/.
- `vendor/z80.mjs` bundles the two npm modules with esbuild. Original emulator source is in source/z80-emulator-2.3.0.tgz; z80-base source is in source/z80-base-src/ with its package metadata.
- Rebuild: install z80-emulator@2.3.0 with z80-base@2.0.1 and esbuild, then run `esbuild node_modules/z80-emulator/dist/index.js --bundle --format=esm --minify --outfile=vendor/z80.mjs`. Dependency lockfile is included.
- This is an instruction-oriented memory/I/O callback core, not floooh/chips and not a pin-accurate Z80. The smaller original assembler is separate from the full opcode emulator.

## Research references, not runtime dependencies

The supplied research inspired the separation of document, digital, analogue and CPU domains. DigitalJS, floooh/chips, CircuitJS, JointJS, svg.js, uPlot and Wokwi are not bundled or claimed as integrated dependencies in this edition. In particular, no full analogue/digital co-simulation or 32-bit processor support is implied.

## Artwork

See ASSET-ATTRIBUTION.md for the bespoke generated laboratory illustration. Circuit diagrams and live instrument data are produced by code, not by generated artwork.
