//Let's define some variables to represent the form data
//At the beginning, the form is empty, and therefore, not valid

//Data to send
let formData = {
    email: "",
    password: "",
    remember: false
}

//This data will be read but not be sent as part of the form submission
let formValid = false;

//Function to read the form
function readForm(){
    formData.email = document.getElementById("email").value.trim();
    formData.password = document.getElementById("password").value.trim();
    formData.remember = document.getElementById("remember").checked;
}

//Function to validate the form
function validateForm() {
    formValid = false;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ((formData.email.length == 0) || (formData.password.length == 0)){
        alert("Please fill in both email and password.");
    } else if (!formData.email.match(mailformat)){
        alert("Invalid e-mail address. Please enter your e-mail again.");
    }  else {
        formValid = true;
    }
}

//Function to write the Login success on the page
function createNewParagraph(content){
    let text = document.createTextNode(content);
    let paragraph = document.createElement("p");
    paragraph.appendChild(text);
    paragraph.style = "white-space: pre;";
    paragraph.id = "hiddenParagraph";

    let element = document.getElementById("hiddenSection");
    let existingParagraph = document.getElementById("hiddenParagraph");
    element.replaceChild(paragraph, existingParagraph);
}

//Function to submit the form, this should be called by the Login button
//on click
function loginUser(){
    readForm();
    validateForm();
    if (formValid){
        let formText = "Login successful for: " + formData.email + "\n";
        formText += formData.remember ? "User chose to be remembered." : "User did not choose to be remembered.";

        console.log(formText);
        createNewParagraph(formText);
    }
}
