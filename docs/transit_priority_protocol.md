# Transit Signal Priority (TSP) Protocol

## Architecture
1. Inbound Request: Connected vehicle emits DSRC/C-V2X priority request packet 150m before intersection.
2. Signal Controller Arbiter: Evaluates pedestrian clearance interval safety.
3. Action: Either truncates opposing red phase or extends active green by up to 15 seconds.
