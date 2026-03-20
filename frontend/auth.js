const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const navAuthBtn = document.getElementById("nav-auth-btn");
const btnUserRole = document.getElementById("btn-user-role");
const btnAdminRole = document.getElementById("btn-admin-role");
const loginTitle = document.getElementById("login-title");
const loginDesc = document.getElementById("login-desc");
const emailInput = document.getElementById("login-email");
const signupLinkContainer = document.getElementById("signup-link-container");

let currentRole = "user";

if (btnUserRole && btnAdminRole) {
  btnUserRole.addEventListener("click", () => {
    currentRole = "user";
    btnUserRole.classList.add("active");
    btnAdminRole.classList.remove("active");
    loginTitle.textContent = "User Login";
    loginDesc.textContent = "Log in to manage your luxury travels.";
    emailInput.placeholder = "Email Address";
    emailInput.type = "email";
    signupLinkContainer.style.display = "block";
  });

  btnAdminRole.addEventListener("click", () => {
    currentRole = "admin";
    btnAdminRole.classList.add("active");
    btnUserRole.classList.remove("active");
    loginTitle.textContent = "Admin Login";
    loginDesc.textContent = "Access the secure admin portal.";
    emailInput.placeholder = "Admin Username";
    emailInput.type = "text";
    signupLinkContainer.style.display = "none";
  });
}

// Global Auth Check State
const currentUser = JSON.parse(localStorage.getItem("travelBlissUser"));

if (navAuthBtn) {
  if (currentUser) {
    if (currentUser.role === "admin") {
      navAuthBtn.textContent = "Admin Portal";
      navAuthBtn.href = "admin.html";
    } else {
      navAuthBtn.textContent = "My Dashboard";
      navAuthBtn.href = "user-dashboard.html";
    }
  }
}

// Redirect protection logic
if (window.location.pathname.endsWith("admin.html")) {
  if (!currentUser || currentUser.role !== "admin") {
    alert("Unauthorized. Admin access required.");
    window.location.href = "login.html";
  }
}

if (window.location.pathname.endsWith("user-dashboard.html")) {
  if (!currentUser || currentUser.role === "admin") {
    window.location.href = "login.html";
  }
}

// Signup handler
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        window.location.href = "login.html";
      }
    } catch (err) {
      alert("Error communicating with server.");
    }
  });
}

// Login handler
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailOrUsername = emailInput.value;
    const password = document.getElementById("login-password").value;

    try {
      let endpoint = "http://localhost:3000/login";
      let bodyData = { email: emailOrUsername, password };

      if (currentRole === "admin") {
        endpoint = "http://localhost:3000/admin-login";
        bodyData = { username: emailOrUsername, password };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Safe object structuring
        const userToSave = currentRole === "admin" 
          ? { role: "admin", username: emailOrUsername } 
          : { ...data.user, role: "user" };
          
        localStorage.setItem("travelBlissUser", JSON.stringify(userToSave));
        
        if (currentRole === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error communicating with server.");
    }
  });
}
