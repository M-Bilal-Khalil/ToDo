function registerUser(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form field values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("exampleInputEmail1").value.trim();
    const password = document.getElementById("exampleInputPassword1").value;
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    // Retrieve existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if email is already registered
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert("This email is already registered. Please use a different email.");
      return false;
    }
  
    // Add new user to the users array
    users.push({ fullName, email, password });
  
    // Save updated users array to local storage
    localStorage.setItem("users", JSON.stringify(users));
  
    // Success message
    alert("Registration successful! Redirecting to login page...");
  
    // Redirect to login page
    window.location.href = "../login/login.html";
  
    return true;
  }