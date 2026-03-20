const form = document.getElementById("bookingform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log("Form Data:", data);

  try {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);

    form.reset();
  } catch (error) {
    alert("Error submitting booking");
    console.error(error);
  }
});
