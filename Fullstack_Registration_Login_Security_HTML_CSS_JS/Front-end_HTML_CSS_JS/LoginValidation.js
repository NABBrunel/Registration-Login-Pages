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
async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter both email and password");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        if (response.ok) {
            const token = response.headers.get("Authorization");

            if (!token) {
                alert("Login failed");
                return;
            }

            localStorage.setItem("token", token);
            console.log("Token stored:", token);

            alert("Login successful!");

        } else if (response.status === 401) {
            alert("Invalid email or password");
        } else {
            alert("Login failed");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Cannot connect to server");
    }
}

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You are not logged in");
        window.location.href = "login.html";
        return null;
    }
    return {
        "Authorization": token,
        "Content-Type": "application/json"
    };
}

async function authenticatedFetch(url, method = "GET", body = null) {
    const headers = getAuthHeaders();
    if (!headers) return null;

    const options = {
        method: method,
        headers: headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 403 || response.status === 401) {
            alert("Please login again");
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return null;
        }

        return response;

    } catch (error) {
        console.error("Error:", error);
        alert("Error.");
        return null;
    }
}