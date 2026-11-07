# pixlpin-design

A portable agent skill. It pulls real design references from [pixlpin.com](https://pixlpin.com), measures exact design tokens (colors, type, spacing, radii, shadows, motion) from the live sites, then builds clean, professional UI from them instead of generic AI-looking code.

Needs an agent that can open web pages and run JavaScript in them. Without one, use the manual fallback at the bottom of `SKILL.md`.

## Install

**Claude Code**
```bash
git clone https://github.com/Xcatoos/pixlpin-design-skill ~/.claude/skills/pixlpin-design
```

**Codex, Cursor, Gemini CLI, other agents**: clone the repo into your project (or any folder). `AGENTS.md` tells the agent to read `SKILL.md` before building UI. For tools with their own rules file, copy the contents of `SKILL.md` into it.

**ChatGPT or any chat without a browser**: paste the contents of `SKILL.md` as your first message (or into custom instructions / a Project), then follow the manual fallback: run `scripts/extract-tokens.js` in your browser console on each reference site and paste the JSON back.

## Files

- `SKILL.md`: the workflow
- `scripts/extract-tokens.js`: console snippet that returns a site's top design tokens as JSON
- `AGENTS.md`: pointer for agents that read it automatically
