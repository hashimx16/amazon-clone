const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const event = JSON.parse(fs.readFileSync(0, 'utf8'));
if (!['UserPromptSubmit', 'Stop'].includes(event.hook_event_name)) process.exit(0);
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: event.cwd, encoding: 'utf8' }).trim();
const dir = path.join(root, '.agent-logs');
fs.mkdirSync(dir, { recursive: true });
const id = event.session_id;
const stateDir = path.join(root, '.codex', 'capture-state');
fs.mkdirSync(stateDir, { recursive: true });
const index = path.join(stateDir, `${id}.json`);
const now = new Date().toISOString();
let state;
if (fs.existsSync(index)) state = JSON.parse(fs.readFileSync(index, 'utf8'));
else {
  const stamp = now.replace(/T/, '_').replace(/:/g, '-').slice(0, 19);
  let author = 'unknown';
  try { author = execFileSync('git', ['config', 'user.name'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || author; } catch {}
  state = { id, date: now.slice(0, 10), author, project: path.basename(root), file: `${stamp}_${id}.md`, entries: [] };
}
if (event.hook_event_name === 'UserPromptSubmit') {
  state.entries.push({ type: 'PROMPT', turn: event.turn_id, timestamp: now, model: event.model, body: event.prompt });
} else if (typeof event.last_assistant_message === 'string' && event.last_assistant_message.length) {
  const prompt = state.entries.findLast(x => x.type === 'PROMPT' && x.turn === event.turn_id);
  if (!state.entries.some(x => x.type === 'RESPONSE' && x.turn === event.turn_id))
    state.entries.push({ type: 'RESPONSE', turn: event.turn_id, timestamp: now, model: event.model, body: event.last_assistant_message, num: prompt?.num });
}
let num = 0;
for (const entry of state.entries) {
  if (entry.type === 'PROMPT') entry.num = ++num;
  else entry.num = state.entries.find(x => x.type === 'PROMPT' && x.turn === entry.turn)?.num ?? num;
}
const prompts = state.entries.filter(x => x.type === 'PROMPT');
const first = prompts[0]?.timestamp ?? now;
const last = prompts.at(-1)?.timestamp ?? now;
const model = prompts[0]?.model ?? event.model;
const header = `---\nsession_id: ${id}\ndate: ${state.date}\nauthor: ${state.author}\nmodel: ${model}\ntool: codex\nproject: ${state.project}\ntotal_exchanges: ${prompts.length}\nfirst_prompt_time: ${first}\nlast_prompt_time: ${last}\n---\n\n# Session Log - ${state.date}\n\nSession: \`${id.slice(0, 8)}\` | Project: \`${state.project}\` | Author: \`${state.author}\`\n\n---\n\n`;
const body = state.entries.map(x => `[LOG_ENTRY type=${x.type} num=${x.num} session=${id.slice(0, 8)}]\ntimestamp: ${x.timestamp}\nmodel: ${x.model}\n\n${x.body}\n\n`).join('');
fs.writeFileSync(path.join(dir, state.file), header + body);
fs.writeFileSync(index, JSON.stringify(state));
