#!/usr/bin/env node
// ponytail — Claude Code SessionStart activation hook
//
// Runs on every session start: emits the ponytail ruleset as hidden
// SessionStart context, filtered to the active intensity level.

const { getDefaultMode } = require('./ponytail-config');
const { getPonytailInstructions } = require('./ponytail-instructions');

const mode = getDefaultMode();

// "off" mode — skip activation entirely, don't emit rules
if (mode === 'off') {
  process.stdout.write('OK');
  process.exit(0);
}

// Emit the ponytail ruleset, filtered to the active intensity level.
try {
  process.stdout.write(getPonytailInstructions(mode));
} catch (e) {
  // Silent fail — stdout closed/EPIPE at hook exit must not surface as a hook failure
}
