// use native fetch

async function test() {
  const messages = [
    { role: "user", content: "<RESUME_UPLOAD_START>...<RESUME_UPLOAD_END> Hi" },
    { role: "assistant", content: "Thanks for sharing your resume. Let's start with a question." },
    { role: "user", content: "I'm ready." },
    { role: "assistant", content: "<PATHS>[...]</PATHS>" },
    { role: "user", content: "I'd like to explore the Product Manager path. Please build me a detailed roadmap for this career transition." }
  ];

  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });
  
  const text = await res.text();
  console.log("Response for 'Product Manager':");
  console.log(text.substring(0, 300) + "...");

  const msgs2 = [
    { role: "user", content: "<RESUME_UPLOAD_START>...<RESUME_UPLOAD_END> Hi" },
    { role: "assistant", content: "Thanks for sharing your resume. Let's start with a question." },
    { role: "user", content: "I'm ready." },
    { role: "assistant", content: "<PATHS>[...]</PATHS>" },
    { role: "user", content: "none of these" }
  ];

  const res2 = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: msgs2 })
  });
  
  const text2 = await res2.text();
  console.log("\nResponse for 'none of these':");
  console.log(text2.substring(0, 300) + "...");
}

test().catch(console.error);
