window.addEventListener("load",  ()=>{
  const ContactBtn = document.querySelector("#contactbtn")

  const nameInput = document.querySelector("#contactname")
  const emailInput = document.querySelector("#contactemail")
  const subjectInput = document.querySelector("#contactsubject")
  const messageInput = document.querySelector("#contactmessage")
  const errorfield = document.querySelector("#contacterror")

  ContactBtn.addEventListener('click', async (e) =>{
          e.preventDefault()
          

         if(emailInput.value == "" && messageInput.value == ""){
            console.log("Please Provide your email")
            emailInput.style.border = "2px solid crimson"
            messageInput.style.border =  "2px solid crimson"
            errorfield.style.display = "block"
         } 
         else{
            ContactBtn.textContent = "Sending Message..."
             errorfield.style.display = "none"
            emailInput.style.border = "1px solid lightgrey"
            messageInput.style.border =  "1px solid lightgrey"
            try {
                const data = await axios.post('/wcpi/api/contact', {
                name:nameInput.value ,
                email: emailInput.value,
                subject:subjectInput.value,
                message: messageInput.value
               })
               console.log(data)
              
               ContactBtn.textContent = "Message Sent!"
               ContactBtn.style.backgroundColor = "#d63384" 
               nameInput.value = ""
               emailInput.value =""
               subjectInput.value =""
               messageInput.value =""
               setInterval(()=>{
                   ContactBtn.textContent = "Send Message"
               }, 3000)
        } catch (error) {
            console.log(error)
        }
         }  
   
  })

})