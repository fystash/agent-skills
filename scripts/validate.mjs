#!/usr/bin/env node
/**
 * Validate fystash/agent-skills against the open Agent Skills format
 * (W8-5 / ADR-0090). Structural + secret/private-endpoint scan.
 * Catalog/CLI command matching is done by the sandbox gate when catalogs
 * are present; this script stays runnable in the public repo CI.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED = ["fystash", "fystash-cli", "fystash-debug", "fystash-integrations"];
const MAX_LINES = 500;
const MAX_TOKENS = 5000;
const FORBIDDEN = [
  "googleapis.com",
  "console.cloud.google.com",
  "169.254.169.254",
  "metadata.google.internal",
  "fy_at_",
  "fy_rt_",
  "fy_ac_",
  "fy_dc_",
  "host-agent",
];

const errors = [];

function fail(msg) {
  errors.push(msg);
}

function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    fail(`${file}: missing YAML frontmatter`);
    return { name: "", description: "", body: text };
  }
  const end = text.indexOf("\n---", 4);
  if (end < 0) {
    fail(`${file}: unclosed YAML frontmatter`);
    return { name: "", description: "", body: text };
  }
  const fm = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\r?\n/, "");
  let name = "";
  let description = "";
  let inDesc = false;
  let descLines = [];
  for (const line of fm.split(/\r?\n/)) {
    if (inDesc) {
      if (/^[A-Za-z0-9_-]+:/.test(line) && !/^\s/.test(line)) {
        inDesc = false;
      } else {
        descLines.push(line.replace(/^\s+/, "").replace(/^>-\s*/, ""));
        continue;
      }
    }
    const nameMatch = line.match(/^name:\s*(.+)\s*$/);
    if (nameMatch) {
      name = nameMatch[1].trim().replace(/^["']|["']$/g, "");
      continue;
    }
    const descMatch = line.match(/^description:\s*(.*)$/);
    if (descMatch) {
      const rest = descMatch[1].trim();
      if (rest === ">-" || rest === "|" || rest === ">" || rest === "") {
        inDesc = true;
        descLines = [];
      } else {
        description = rest.replace(/^["']|["']$/g, "");
      }
    }
  }
  if (!description && descLines.length) {
    description = descLines.filter(Boolean).join(" ");
  }
  return { name, description, body };
}

function walkMarkdown(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkMarkdown(p, acc);
    else if (name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

const indexCodes = new Set();
const errorIndex = path.join(root, "fystash-debug/references/error-index.md");
if (existsSync(errorIndex)) {
  for (const m of readFileSync(errorIndex, "utf8").matchAll(/`([A-Z][A-Z0-9_]{3,})`/g)) {
    indexCodes.add(m[1]);
  }
}

for (const skill of REQUIRED) {
  const dir = path.join(root, skill);
  const skillMd = path.join(dir, "SKILL.md");
  if (!existsSync(skillMd)) {
    fail(`missing ${skill}/SKILL.md`);
    continue;
  }
  const text = readFileSync(skillMd, "utf8");
  const { name, description, body } = parseFrontmatter(text, `${skill}/SKILL.md`);
  if (name !== skill) {
    fail(`${skill}/SKILL.md name=${JSON.stringify(name)} must equal directory ${skill}`);
  }
  if (!description.trim()) {
    fail(`${skill}/SKILL.md description is empty`);
  } else if (!/use when|\bwhen\b/i.test(description)) {
    fail(`${skill}/SKILL.md description must say what AND when`);
  }
  const lines = text.split(/\n/).length;
  const tokens = text.trim().split(/\s+/).length;
  if (lines > MAX_LINES) fail(`${skill}/SKILL.md has ${lines} lines (max ${MAX_LINES})`);
  if (tokens > MAX_TOKENS) fail(`${skill}/SKILL.md has ~${tokens} tokens (max ${MAX_TOKENS})`);

  const refsDir = path.join(dir, "references");
  if (!existsSync(refsDir) || !statSync(refsDir).isDirectory()) {
    fail(`${skill}/references/ is required`);
    continue;
  }
  const refFiles = readdirSync(refsDir).filter((f) => f.endsWith(".md"));
  if (refFiles.length === 0) fail(`${skill}/references/ has no markdown files`);
  for (const ref of refFiles) {
    const needle = `references/${ref}`;
    if (!body.includes(needle)) {
      fail(`${skill}/SKILL.md does not link ${needle}`);
    }
  }
	const nested = body.match(/\]\(([^)]+)\)/g) || [];
	for (const raw of nested) {
		const href = raw.slice(2, -1);
		if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) continue;
		if (href.includes("..") || href.split("/").filter(Boolean).length > 2) {
			fail(`${skill}/SKILL.md reference ${href} is not one-level`);
		}
	}
}

for (const file of walkMarkdown(root)) {
  const rel = path.relative(root, file);
  if (rel.startsWith("node_modules")) continue;
  const text = readFileSync(file, "utf8");
  for (const needle of FORBIDDEN) {
    if (text.includes(needle)) {
      fail(`${rel} contains forbidden ${JSON.stringify(needle)}`);
    }
  }
}

if (existsSync(errorIndex)) {
  const debugRoot = path.join(root, "fystash-debug");
  for (const file of walkMarkdown(debugRoot)) {
    if (path.basename(file) === "error-index.md") continue;
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(/`([A-Z][A-Z0-9_]{5,})`/g)) {
      const code = m[1];
      if (code.startsWith("FYSTASH") || code.startsWith("HTTP") || code === "JSON" || code === "YAML") {
        continue;
      }
      if (!indexCodes.has(code)) {
        fail(`${path.relative(root, file)} mentions ${code} which is not in error-index.md`);
      }
    }
  }
  if (indexCodes.size < 50) {
    fail(`error-index.md only lists ${indexCodes.size} codes`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(e);
  process.exit(1);
}
console.log(`agent-skills ok: ${REQUIRED.join(", ")} (${indexCodes.size} catalog codes indexed)`);
