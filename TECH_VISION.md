# TECHNICAL VISION — newsgen

## Summary

`newsgen` is a composable CLI framework for building your own modular news engine.  
It is designed as **infrastructure**, not a product — a tool to create and control your personal or editorial news flow.

It follows a strict and extensible architecture:

> INPUTS → TRANSFORMS → OUTPUTS

Each stage is fully modular and runs in sequence or parallel depending on the configuration.

---

## Core Principles

### 1. **Modularity**

- Every component (input, transform, output) is a plugin
- Easy to add, remove or customize
- You can write your own logic or use predefined blocks

### 2. **Transparency**

- No internal APIs, no hidden state
- All data flows are inspectable and debuggable
- No magic — news is code, not sorcery

### 3. **Extensibility**

- Designed for community adapters: RSS, Telegram, Email, LLMs, etc.
- AI integrations are optional, controlled, and replaceable
- CLI-first but future-ready for UI

---

## Architecture

```text
[input/rss] --> [transform/verify] --> [output/telegram]
[input/telegram] --> [transform/summarize] --> [output/markdown]
```

### Phases:

#### 1. Input (parallel)

Adapters parse raw data into a standard internal format: `NewsItem`.

Example sources:

- RSS
- Telegram channels
- APIs
- Static files
- Web scraping

#### 2. Transform (sequential)

Adapters process, enrich, filter or format each `NewsItem`.

Examples:

- Keyword filters
- Language translation
- AI summarization (OpenAI, Claude, local models)
- Duplicate detection
- Sentiment tagging

#### 3. Output (parallel)

Adapters deliver the final transformed news items.

Examples:

- Markdown exports
- HTML email digests
- Telegram bots
- Notion, files, or webhook endpoints

---

## Developer Experience

- Built in TypeScript
- Pluggable via CLI and config
- Designed to be run via `npx newsgen` or as a background job
- Fully self-hostable, no backend required
- Testable, with mock-friendly adapter design

---

## Use Cases

- Personal news reader with digest delivery every hour
- Small media team creating multilingual, AI-curated updates
- Activist network filtering global sources for trusted information
- AI-assisted translation + formatting pipeline for editors

---

## Why CLI?

Because the command line is:

- transparent
- automatable
- scriptable
- sovereign

And because building a UI is easier **after** the architecture is right.

---

## Design Philosophy

> Code is not product. It is possibility.

We treat this project as _infrastructure_, not a feed.  
It’s a new layer for the future of independent information systems.

**newsgen** is designed to be small in size, but massive in implications.  
The rest depends on you.

---

## Stay tuned.

Documentation and initial adapters coming soon.
