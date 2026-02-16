document.addEventListener("DOMContentLoaded", () => {

  /* ===== DOM Elements ===== */
  const chatBody  = document.getElementById("chat-body");
  const input     = document.querySelector("#chat-footer input");
  const sendBtn   = document.querySelector("#chat-footer button");
  const chatIcon  = document.getElementById("chat-icon");
  const chatBox   = document.getElementById("chat-box");
  const chatClose = document.getElementById("chat-close");

  /* ===== Welcome Message + Suggestions ===== */
  const initialChatHTML = `
    <div class="bot-msg">
      Namaste 🙂 Welcome to <b>Infopark Institute</b>, Station Road, Orai.<br>
      You can ask about Admission, Courses, Fees or type your question.
    </div>
    <div class="suggestions">
      <button data-msg="admission">Admission</button>
      <button data-msg="courses">Courses</button>
      <button data-msg="fees">Fees</button>
      <button data-msg="location">Location</button>
      <button data-msg="contact">Contact</button>
    </div>
  `;

  /* ===== OPEN CHAT ===== */
  chatIcon.onclick = () => {
    chatBody.innerHTML = initialChatHTML;
    chatBox.style.display = "flex";
    chatIcon.style.display = "none";
  };

  /* ===== CLOSE CHAT ===== */
  chatClose.onclick = () => {
    chatBox.style.display = "none";
    chatIcon.style.display = "flex";
    resetChat();
  };

  /* ===== SEND MESSAGE ===== */
  sendBtn.onclick = () => handleUserMessage(input.value);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") handleUserMessage(input.value);
  });

  /* ===== HANDLE USER MESSAGE ===== */
  function handleUserMessage(msg) {
    msg = msg.trim();
    if (!msg) return;

    addUserMsg(msg);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      addBotReply(msg);
    }, 1000); // simulate typing
  }

  /* ===== ADD USER MESSAGE ===== */
  function addUserMsg(text) {
    let div = document.createElement("div");
    div.className = "user-msg";
    div.innerText = text;
    chatBody.appendChild(div);
    scrollBottom();
  }

  /* ===== ADD BOT REPLY ===== */
  function addBotReply(userText) {
    let reply = getReply(userText.toLowerCase());
    let div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = reply;
    chatBody.appendChild(div);
    scrollBottom();
  }

  /* ===== TYPING INDICATOR ===== */
  let typingDiv;
  function showTyping() {
    typingDiv = document.createElement("div");
    typingDiv.className = "typing";
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(typingDiv);
    scrollBottom();
  }
  function removeTyping() {
    if (typingDiv) typingDiv.remove();
  }

  /* ===== SMART REPLIES ===== */
  function getReply(msg) {
    if (msg.includes("admission"))
      return "Admission at Infopark Institute is open for all courses. You can apply online or visit the campus. Please provide your name and contact number for assistance.";

    if (msg.includes("courses"))
      return "We offer the following programs:<br><br>" +
             "<b>Degree Programs:</b><br>- BCA (Bachelor of Computer Applications)<br>- MCA (Master of Computer Applications)<br><br>" +
             "<b>Diploma / Certificate Programs:</b><br>- CCC (Course on Computer Concepts)<br>- ADCA (Advanced Diploma in Computer Applications)<br>- O Level (DOEACC)";

    if (msg.includes("fees") || msg.includes("fee"))
      return "Approximate fees at Infopark Institute:<br>- BCA: ₹25,000–₹35,000/year<br>- MCA: ₹40,000–₹55,000/year<br>- CCC: ₹4,000–₹6,000<br>- ADCA: ₹10,000–₹15,000<br>- O Level: ₹20,000–₹30,000";

    if (msg.includes("location"))
      return "Infopark Institute is located at Station Road, Orai. Visit the campus or check Google Maps for directions.";

    if (msg.includes("contact"))
      return "Contact Infopark Institute:<br>📞 Phone: 9876543210<br>📧 Email: info@infoparkinstitute.com<br>Office Hours: Mon-Sat, 10 AM – 5 PM.";

    if (msg.includes("scholarship"))
      return "Infopark Institute offers scholarships based on merit and financial need. For details, please contact the admission office.";

    if (msg.includes("timing") || msg.includes("hours"))
      return "Our office and classes run Monday to Saturday, 10 AM – 5 PM. Sundays are off.";

    if (msg.includes("hostel"))
      return "Currently, we do not provide on-campus hostel facilities. Nearby accommodation options are available. Contact us for guidance.";

    if (msg.includes("transport"))
      return "We have arrangements for local transport info. Students can commute easily from Orai city.";

    if (msg.includes("syllabus"))
      return "Course syllabus is available on our website or you can request it from the admission office.";

    if (msg.includes("exam"))
      return "Exams are conducted as per university guidelines. Internal assessments are held regularly during the semester.";

    if (msg.includes("registration"))
      return "Registration for new students is open online. Please fill the admission form on our website or visit the campus.";

    if (msg.includes("placement"))
      return "Infopark Institute provides career guidance and placement assistance for BCA, MCA and diploma students.";

    if (msg.includes("certificate"))
      return "After course completion, students receive official certificates recognized by relevant authorities.";

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello! I am your assistant for Infopark Institute. You can ask about admission, courses, fees, location, scholarship, hostel, transport, timing, syllabus, exams, registration, placement or certificates.";

    // default reply
    return "Sorry, I didn't understand. Please ask about Admission, Courses, Fees, Location, Scholarship, Hostel, Transport, Timing, Syllabus, Exams, Registration, Placement, or Certificate.";
}


  /* ===== RESET CHAT ===== */
  function resetChat() {
    chatBody.innerHTML = "";
    input.value = "";
  }

  function scrollBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* ===== SUGGESTION BUTTONS ===== */
  document.addEventListener("click", e => {
    if (e.target.closest(".suggestions button")) {
      let msg = e.target.getAttribute("data-msg");
      handleUserMessage(msg);
      document.querySelector(".suggestions")?.remove();
    }
  });

});
