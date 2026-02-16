<?php
header("Content-Type: application/json");

// 🔐 Replace with your OpenAI API key
$OPENAI_API_KEY = "";

$data = json_decode(file_get_contents("php://input"), true);
$userMessage = trim($data['message'] ?? '');

if ($userMessage === "") {
  echo json_encode(["reply" => "Message is empty."]);
  exit;
}

/* ===== System Prompt ===== */
$systemPrompt = "
You are a professional college enquiry assistant for Infopark Institute,
located at Station Road, Orai.

Courses:
- BCA, MCA
- CCC, ADCA, O Level

Approx Fees:
- BCA: ₹25,000–₹35,000 per year
- MCA: ₹40,000–₹55,000 per year
- CCC: ₹4,000–₹6,000
- ADCA: ₹10,000–₹15,000
- O Level: ₹20,000–₹30,000

Only answer questions related to admission, courses, fees, location, and contact.
Reply in simple Hinglish.
";

$postData = [
  "model" => "gpt-4o-mini",
  "messages" => [
    ["role" => "system", "content" => $systemPrompt],
    ["role" => "user", "content" => $userMessage]
  ],
  "temperature" => 0.5
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($postData),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer $OPENAI_API_KEY",
    "Content-Type: application/json"
  ]
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$reply = $result['choices'][0]['message']['content'] ?? 
         "Sorry, I am unable to respond right now.";

echo json_encode(["reply" => nl2br($reply)]);
