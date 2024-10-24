window.addEventListener("load", () => {
  const appointmentNameInput = document.querySelector("#appointmentname");
  const appointmentEmailInput = document.querySelector("#appointmentemail");
  const appointmentPhoneInput = document.querySelector("#appointmentphone");
  const appointmentTopicInput = document.querySelector("#appointmenttopic");
  const appointmentDateInput = document.querySelector("#appointmentdate");
  const appointmentTimeInput = document.querySelector("#appointmenttime");
  const appointmentMessageInput = document.querySelector("#appointmentmessage");
  const appointmentBtn = document.querySelector("#appointmentbtn");
  const appointmenterror = document.querySelector("#appointmenterror");
  appointmentBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (
      appointmentEmailInput.value == "" ||
      appointmentMessageInput == "" ||
      appointmentPhoneInput.value == "" ||
      appointmentMessageInput.value == "" ||
      appointmentTimeInput.value == "" ||
      appointmentNameInput.value == "" ||
      appointmentTopicInput.value == "" ||
      appointmentDateInput.value == ""
    ) {
      appointmenterror.style.display = "block";
      appointmenterror.style.border = "2px solid crimson ";
      appointmenterror.style.borderRadius = "10px ";
      appointmenterror.style.padding = "4px";
      appointmenterror.textContent = "**Please provide all your details.**";
      appointmentDateInput.style.border = "2px solid crimson !important";
      appointmentTimeInput.style.border = "2px solid crimson !important";
      appointmentTopicInput.style.border = "2px solid crimson !important";
      appointmentMessageInput.style.border = "2px solid crimson !important";
      appointmentNameInput.style.border = "2px solid crimson !important";
      appointmentEmailInput.style.border = "2px solid crimson !important";
      appointmentPhoneInput.style.border = "2px solid crimson !important";
      console.log("error");
    } else {
      try {
        appointmenterror.style.display = "none";
        appointmentBtn.textContent = "Sending Appointment...";

        const data = await axios.post("/wcpi/api/appointment", {
          name: appointmentNameInput.value,
          email: appointmentEmailInput.value,
          phone: appointmentPhoneInput.value,
          topic: appointmentTopicInput.value,
          message: appointmentMessageInput.value,
          theTime: appointmentTimeInput.value,
          theDate: appointmentDateInput.value,
        });
        
        setInterval(() => {
          appointmentBtn.textContent = "Book Appointment";
          appointmenterror.style.display = "none";
        }, 3000);
        console.log(data);
        appointmentNameInput.value = "";
        appointmentNameInput.value = "";
        appointmentPhoneInput.value = "";
  
        appointmentMessageInput.value = "";
    
        appointmenterror.style.display = "block";
        appointmenterror.style.color = "#d63384";
        appointmenterror.style.border = "2px solid #d63384 ";
        appointmenterror.textContent = "Appointment sent successfully";
        appointmentBtn.textContent = "Appointment Sent!";

      } catch (error) {
        console.log(error);
      }
    }
  });
});
