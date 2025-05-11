function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("exampleInputEmail1").value.trim();
    const password = document.getElementById("exampleInputPassword1").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Save the logged-in user as currentUser in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        // Redirect to the index.html file in the root directory
        window.location.href = "../index.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }

    return false;
}