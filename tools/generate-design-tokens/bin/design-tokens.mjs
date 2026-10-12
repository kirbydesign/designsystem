#!/usr/bin/env node
import { main } from '../src/cli.mjs';

process.exit(await main(process.argv.slice(2)));
