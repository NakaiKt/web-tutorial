import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENTS_DIR = path.join(__dirname, "../contents");
const OUTPUT_PATH = path.join(__dirname, "../../public/typographyTexts.json");

function getAllTsxFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(filePath));
    } else if (file.endsWith(".tsx")) {
      results.push(filePath);
    }
  });
  return results;
}

function extractTypographyTexts(filePath: string) {
  const code = fs.readFileSync(filePath, "utf-8");
  const results: { file: string; line: number; text: string }[] = [];

  // <Typography>...</Typography> の正規表現
  const typographyRegex = /<Typography[^>]*>([\s\S]*?)<\/Typography>/g;

  let match;
  while ((match = typographyRegex.exec(code)) !== null) {
    const content = match[1];

    // HTMLタグを除去し、テキストのみを抽出
    const textOnly = content
      .replace(/<[^>]*>/g, "") // HTMLタグを除去
      .replace(/\s+/g, " ") // 複数の空白・改行を単一スペースに
      .trim(); // 前後の空白を除去

    if (textOnly && textOnly.length > 0) {
      // 行番号を取得
      const beforeMatch = code.substring(0, match.index);
      const lineNumber = beforeMatch.split("\n").length;

      results.push({
        file: filePath,
        line: lineNumber,
        text: textOnly,
      });
    }
  }

  return results;
}

function main() {
  const files = getAllTsxFiles(CONTENTS_DIR);
  let allResults: { file: string; line: number; text: string }[] = [];
  files.forEach((file) => {
    allResults = allResults.concat(extractTypographyTexts(file));
  });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allResults, null, 2), "utf-8");
  console.log(`Extracted ${allResults.length} Typography texts.`);
}

main();
