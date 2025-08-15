// collect-code.js
// Usage: node collect-code.js
// Optional flags:
//   --root .            // where to start (default ".")
//   --out code_output.txt
//   --max 500000        // max file size in bytes (default 500k)
//   --include .js,.ts,.tsx,.jsx,.json,.css,.scss,.md,.sql,.yml,.yaml,.html,.vue,.py,.sh,.env.example
//   --extra .cjs,.mjs,.toml
//   --showSkipped       // print reasons for skipped files

const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.join("=") || true];
  })
);

const ROOT = path.resolve(process.cwd(), args.root || ".");
const OUT = path.resolve(process.cwd(), args.out || "code_output.txt");
const MAX_SIZE = Number(args.max || 500_000);

const DEFAULT_EXTS = [
  ".js",".jsx",".ts",".tsx",
  ".cjs",".mjs",
  ".json",".md",
  ".css",".scss",
  ".yml",".yaml",
  ".html",".vue",
  ".sql",".prisma",
  ".py",".sh",
  ".toml",".cfg",".ini",
  ".env.example" // allow example envs only
];

const include = new Set(
  String(args.include || DEFAULT_EXTS.join(","))
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
);
if (args.extra) {
  String(args.extra).split(",").forEach(x => include.add(x.trim()));
}

const ALWAYS_INCLUDE_BASENAMES = new Set([
  "package.json","package-lock.json","pnpm-lock.yaml","yarn.lock",
  "next.config.js","next.config.mjs",
  "vercel.json",
  "drizzle.config.ts","drizzle.config.mjs","drizzle.config.js",
  "schema.prisma","tsconfig.json","eslint.config.js",".eslintrc.js",".eslintrc.cjs",".eslintrc.json",
  ".prettierrc",".prettierrc.json",".prettierrc.yaml",".prettierrc.yml",".prettierrc.js",
]);

// Directories we never walk
const IGNORE_DIRS = new Set([
  "node_modules",".git",".next",".turbo",".vercel","dist","build","out","coverage",
  ".idea",".vscode",".DS_Store","__pycache__",".pytest_cache",".cache",".nuxt"
]);

// Files we never include (secrets/binaries)
const BLOCK_BASENAMES = new Set([
  ".env",".env.local",".env.development",".env.production",".env.test",
  "id_rsa","id_rsa.pub",".ssh","authorized_keys","known_hosts"
]);

const BLOCK_EXTS = new Set([
  ".png",".jpg",".jpeg",".gif",".webp",".avif",".bmp",".ico",
  ".mp3",".wav",".flac",".mp4",".mov",".mkv",".avi",
  ".pdf",".ttf",".otf",".woff",".woff2",
  ".zip",".gz",".bz2",".7z",".rar"
]);

const SKIP_PATTERNS = [
  /(^|\/)\./, // hidden files/dirs (like .cache), but we'll still allow specific config basenames above
];

const shouldSkipDir = (name) =>
  IGNORE_DIRS.has(name) || name.startsWith(".") && ![".vscode"].includes(name);

const isAllowedTextFile = (filePath, stat) => {
  const base = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (BLOCK_BASENAMES.has(base)) return { ok: false, reason: "blocked basename" };
  if (BLOCK_EXTS.has(ext)) return { ok: false, reason: "blocked binary ext" };
  if (stat.size > MAX_SIZE) return { ok: false, reason: `too large (${stat.size} bytes)` };

  // allow specific config files even if extension not whitelisted
  if (ALWAYS_INCLUDE_BASENAMES.has(base)) return { ok: true };

  // allow listed extensions
  if (include.has(ext)) return { ok: true };

  // allow files without extension if they look like scripts/configs
  if (!ext && /^[A-Za-z0-9._-]+$/.test(base)) {
    // common no-ext files to keep: Dockerfile, Makefile, Procfile
    const keepNoExt = new Set(["Dockerfile","Makefile","Procfile","LICENSE","README","README.md"]);
    if (keepNoExt.has(base)) return { ok: true };
  }
  return { ok: false, reason: "extension not in include list" };
};

async function* walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const d of entries) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (shouldSkipDir(d.name)) continue;
      yield* walk(p);
    } else if (d.isFile()) {
      yield p;
    }
  }
}

async function main() {
  const outStream = fs.createWriteStream(OUT, { encoding: "utf8" });
  let count = 0, skipped = 0;

  for await (const file of walk(ROOT)) {
    const rel = path.relative(ROOT, file);
    const base = path.basename(file);

    // Skip hidden files by pattern unless explicitly allowed
    if (SKIP_PATTERNS.some(rx => rx.test(rel)) && !ALWAYS_INCLUDE_BASENAMES.has(base)) {
      skipped++; if (args.showSkipped) console.error(`skip: ${rel} (hidden)`);
      continue;
    }

    try {
      const st = await fsp.stat(file);
      const ok = isAllowedTextFile(file, st);
      if (!ok.ok) {
        skipped++; if (args.showSkipped) console.error(`skip: ${rel} (${ok.reason})`);
        continue;
      }

      const content = await fsp.readFile(file, "utf8");

      outStream.write("\n\n");
      outStream.write("==== BEGIN FILE =============================================\n");
      outStream.write(`PATH: ${rel}\n`);
      outStream.write("=============================================================\n");
      outStream.write(content);
      outStream.write("\n=============================================================\n");
      outStream.write("==== END FILE ===============================================\n");

      count++;
    } catch (e) {
      skipped++; if (args.showSkipped) console.error(`skip: ${rel} (error: ${e.message})`);
    }
  }

  outStream.end(() => {
    console.log(`Wrote ${count} files to ${path.relative(process.cwd(), OUT)} (skipped ${skipped}).`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
