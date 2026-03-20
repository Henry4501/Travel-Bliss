document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("bookings-tbody");
  const noData = document.getElementById("no-data");
  
  const switchRoleBtn = document.getElementById("switch-role-btn");
  if (switchRoleBtn) {
    switchRoleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("travelBlissUser");
      window.location.href = "login.html";
    });
  }

  try {
    const response = await fetch("https://travel-bliss-hpg8.onrender.com/bookings");
    const bookings = await response.json();

    if (bookings.length === 0) {
      noData.style.display = "block";
    } else {
      bookings.forEach(b => {
        const tr = document.createElement("tr");
        
        let dateStr = b.travel_date;
        if (dateStr) {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) dateStr = d.toLocaleDateString();
        }

        tr.innerHTML = `
          <td>#${b.id}</td>
          <td style="font-weight: 600;">${b.name || '-'}</td>
          <td>${b.email || '-'}</td>
          <td>${b.phone_no || '-'}</td>
          <td><span style="background: rgba(255,152,0,0.2); border: 1px solid rgba(255,152,0,0.4); padding: 5px 12px; border-radius: 20px; color: #ffb74d;">${b.destination || '-'}</span></td>
          <td>${dateStr || '-'}</td>
          <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #ccc;">${b.add_notes || '-'}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    alert("Could not connect to the Backend server to fetch bookings.");
  }
});
