import { constants } from "node:fs";
import { access, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const workspace = fileURLToPath(new URL("../", import.meta.url));
const environmentFile = path.join(workspace, "backend", ".env");
const exampleFile = path.join(workspace, "backend", ".env.example");

try {
  await access(environmentFile, constants.F_OK);
  console.log("[SunWise] Se conservará backend/.env existente.");
} catch {
  await copyFile(exampleFile, environmentFile);
  console.log("[SunWise] Se creó backend/.env desde .env.example.");
}
