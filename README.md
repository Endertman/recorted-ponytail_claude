# Ponytail

Lazy senior dev mode for Claude Code. Forces the simplest, shortest solution
that actually works — YAGNI, the standard library before custom code, native
platform features before dependencies, one line before fifty — without ever
cutting input validation, error handling, security, or accessibility.

## Install (Claude Code)

```
/plugin marketplace add Endertman/recorted-ponytail_claude
/plugin install ponytail@ponytail
```

Desktop app (no `/plugin` command): Customize → the **+** by personal plugins →
**Create plugin and add marketplace** → **Add from repository** → enter the repo URL.

The plugin runs two small Node.js lifecycle hooks (SessionStart and
UserPromptSubmit), so `node` must be on your PATH. On Windows make sure `node`
is on the system PATH; the hooks ship a PowerShell variant and run as-is. If
Node is missing, the skills still work — the always-on activation just stays
quiet instead of erroring.

## Modes

`/ponytail [lite | full | ultra | off]` sets the intensity (default `full`).
`stop ponytail` or `normal mode` turns it off for the session.

| Mode | Behavior |
|---|---|
| **lite** | Builds what's asked, names the lazier alternative in one line. |
| **full** | The ladder enforced: stdlib and native first, shortest diff. Default. |
| **ultra** | YAGNI extremist: deletion before addition, challenges the requirement. |

Set the default for every new session with the `PONYTAIL_DEFAULT_MODE` env var
(`lite`/`full`/`ultra`/`off`) or a `defaultMode` field in
`~/.config/ponytail/config.json` (`%APPDATA%\ponytail\config.json` on Windows).

## Commands

| Command | What it does |
|---|---|
| `/ponytail-review` | Review the current diff for over-engineering → a delete-list. |
| `/ponytail-audit` | Audit the whole repo for over-engineering, not just the diff. |
| `/ponytail-debt` | Harvest the `ponytail:` shortcuts you've deferred into a ledger. |

## License

[MIT](LICENSE). The shortest license that works.
