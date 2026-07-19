import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const workspace = fileURLToPath(new URL("../", import.meta.url));
const backendDirectory = path.join(workspace, "SunWise-backend");
const frontendDirectory = path.join(workspace, "SunWise");
const services = [
  { name: "backend", color: "\u001b[32m", cwd: backendDirectory, args: ["--watch", path.join(backendDirectory, "src", "server.js")] },
  { name: "frontend", color: "\u001b[36m", cwd: frontendDirectory, args: [path.join(frontendDirectory, "node_modules", "vite", "bin", "vite.js"), "--host", "0.0.0.0"] },
];
const children = [];
let shuttingDown = false;

function writePrefixed(stream, name, color) {
  let pending = "";
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    pending += chunk;
    const lines = pending.split(/\r?\n/);
    pending = lines.pop() || "";
    for (const line of lines) if (line) process.stdout.write(`${color}[${name}]\u001b[0m ${line}\n`);
  });
}

function stopAll(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) if (!child.killed) child.kill();
  setTimeout(() => process.exit(exitCode), 150).unref();
}

for (const service of services) {
  const child = spawn(process.execPath, service.args, { cwd: service.cwd, env: process.env, stdio: ["inherit", "pipe", "pipe"] });
  children.push(child);
  writePrefixed(child.stdout, service.name, service.color);
  writePrefixed(child.stderr, service.name, service.color);
  child.on("error", (error) => { console.error(`[${service.name}] No se pudo iniciar: ${error.message}`); stopAll(1); });
  child.on("exit", (code) => { if (!shuttingDown) { console.error(`[${service.name}] terminó con código ${code ?? 1}. Se detendrán ambos servicios.`); stopAll(code ?? 1); } });
}

console.log("SunWise iniciando: frontend http://localhost:5173 | API http://localhost:3000/api");
process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
