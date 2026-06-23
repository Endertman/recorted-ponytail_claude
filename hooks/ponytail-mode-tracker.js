#!/usr/bin/env node
// ponytail — UserPromptSubmit hook to track which ponytail mode is active.
// Inspects user input for /ponytail commands and announces the mode change.

const { getDefaultMode, isDeactivationCommand } = require('./ponytail-config');

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    // Strip UTF-8 BOM some shells prepend when piping (breaks JSON.parse)
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Match /ponytail commands
    if (/^[/@$]ponytail/.test(prompt)) {
      const parts = prompt.split(/\s+/);
      const cmd = parts[0].replace(/^[@$]/, '/');
      const arg = parts[1] || '';

      let mode = null;

      if (cmd === '/ponytail-review' || cmd === '/ponytail:ponytail-review') {
        mode = 'review';
      } else if (cmd === '/ponytail' || cmd === '/ponytail:ponytail') {
        if (arg === 'lite') mode = 'lite';
        else if (arg === 'full') mode = 'full';
        else if (arg === 'ultra') mode = 'ultra';
        else if (arg === 'off') mode = 'off';
        else mode = getDefaultMode();
      }

      if (mode && mode !== 'off') {
        process.stdout.write('PONYTAIL MODE CHANGED — level: ' + mode);
      } else if (mode === 'off') {
        process.stdout.write('PONYTAIL MODE OFF');
      }
    }

    // Detect deactivation
    if (isDeactivationCommand(prompt)) {
      process.stdout.write('PONYTAIL MODE OFF');
    }
  } catch (e) {
    // Silent fail
  }
});
