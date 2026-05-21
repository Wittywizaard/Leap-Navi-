import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let text = "";

    if (file.name.endsWith(".pdf")) {
      // Extract text from PDF using basic approach
      const str = buffer.toString("binary");
      // Extract readable text from PDF binary
      const matches = str.match(/\(([^)]{2,200})\)/g) || [];
      const rawText = matches
        .map(m => m.slice(1, -1))
        .filter(t => /[a-zA-Z]{2,}/.test(t) && !t.includes("\\"))
        .join(" ");
      text = rawText.length > 100 ? rawText : buffer.toString("utf-8").replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
    } else if (file.name.endsWith(".docx")) {
      // Basic DOCX text extraction - get XML content
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(buffer);
      const docXml = await zip.file("word/document.xml")?.async("string") || "";
      text = docXml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    } else {
      text = buffer.toString("utf-8");
    }

    if (!text || text.length < 50) {
      text = "Resume uploaded but text extraction had limited content. Please analyze based on the filename: " + file.name;
    }

    return NextResponse.json({ text: text.slice(0, 8000), fileName: file.name });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Parse failed" }, { status: 500 });
  }
}
