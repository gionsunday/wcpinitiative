window.addEventListener("load", () => {
  const newsletterBtn = document.querySelector("#newsletterbtn");
  const newserror = document.querySelector("#newslettererror")

  const newsletterBtn2 = document.querySelector("#newsletterbtn2");

 const emailInput = document.querySelector("#newsletteremail");
  const nameInput = document.querySelector("#newslettername");

  newsletterBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (emailInput.value == "") {
      console.log("Please Provide Email");
      emailInput.style.border = "2px solid crimson !important"
      newserror.textContent = "Please enter a valid email!"
    } else {
      newsletterBtn.textContent = "Subscribing...";
      emailInput.style.border = "none"
      
      let _name = ""
      if(!nameInput || nameInput.value == ""){
        _name = "There"
      }
      else{
        _name = nameInput.value
      }

      try {
        const data = await axios.post("/wcpi/api/newsletter", {
          email: emailInput.value,
          name:_name 
        });

        newsletterBtn.textContent = "Subscribed!";
        newsletterBtn.textContent = "Thank you!";
        // console.log(data);
        emailInput.value = "";
        nameInput.value = ""
        newserror.textContent = data.data.maessage

        setInterval(() => {
          newsletterBtn.textContent = "Subscribe";
          newserror.textContent = ""
        }, 3000);
      } catch (error) {
        console.log(error);
        newserror.textContent= error.response.data.message
        newsletterBtn.textContent = "Subscribe";

      }
    }
  });


 
});
