const fs = require('fs');
const content = fs.readFileSync('app/api/chat/route.ts', 'utf8');

const m2Match = content.match(/const MOCK_PATHS_SET2 = `([\s\S]*?)`;/);
if (m2Match) {
  const m2 = m2Match[1];
  const pathsMatch = m2.match(/<PATHS>([\s\S]*?)<\/PATHS>/);
  if (pathsMatch) {
    try {
      JSON.parse(pathsMatch[1].trim());
      console.log("MOCK_PATHS_SET2 IS VALID JSON");
    } catch(e) {
      console.error("MOCK_PATHS_SET2 JSON ERROR:", e.message);
    }
  }
}

const roadmaps = ["product manager", "web developer", "data analyst"];
for (const role of roadmaps) {
  const roleMatch = content.match(new RegExp(`"${role}": \`([\\s\\S]*?)\`(,|\\n\\};)`));
  if (roleMatch) {
    const roadmapMatch = roleMatch[1].match(/<ROADMAP>([\s\S]*?)<\/ROADMAP>/);
    if (roadmapMatch) {
      try {
        JSON.parse(roadmapMatch[1].trim());
        console.log(`ROADMAP ${role} IS VALID JSON`);
      } catch(e) {
        console.error(`ROADMAP ${role} JSON ERROR:`, e.message);
      }
    }
  }
}
