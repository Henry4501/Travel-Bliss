document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.getElementById("booking-cards");
  const noData = document.getElementById("no-data");
  const welcomeMsg = document.getElementById("welcome-msg");
  
  const currentUser = JSON.parse(localStorage.getItem("travelBlissUser"));
  if (!currentUser || currentUser.role === "admin") return;

  welcomeMsg.textContent = `Welcome back, ${currentUser.name || currentUser.email.split('@')[0]}!`;

  async function loadBookings() {
    cardsContainer.innerHTML = "";
    try {
      const response = await fetch(`http://localhost:3000/my-bookings/${currentUser.email}`);
      const bookings = await response.json();

      if (bookings.length === 0) {
        noData.style.display = "block";
      } else {
        noData.style.display = "none";
        bookings.forEach(b => {
          let dateStr = b.travel_date;
          if (dateStr) {
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) dateStr = d.toISOString().split('T')[0];
          }

          const card = document.createElement("div");
          card.className = "card glass-dark booking-card";
          card.innerHTML = `
            <h3 style="color: #ff9800;">Booking #${b.id} - ${b.destination || 'TBD'}</h3>
            <p><strong>Date:</strong> ${dateStr || '-'}</p>
            <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px;"><strong>Notes:</strong> ${b.add_notes || 'None'}</p>
            <div class="booking-actions">
              <button class="btn-edit" onclick="openEditModal(${b.id}, '${b.destination}', '${dateStr}', '${b.add_notes || ''}')">Edit Trip</button>
              <button class="btn-delete" onclick="deleteBooking(${b.id})">Cancel Trip</button>
            </div>
          `;
          cardsContainer.appendChild(card);
        });
      }
    } catch (error) {
       console.error(error);
    }
  }

  window.deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to completely cancel this luxury trip? This cannot be undone!")) return;
    try {
      await fetch(`http://localhost:3000/bookings/${id}`, { method: "DELETE" });
      loadBookings();
    } catch (e) {
      alert("Failed to delete booking.");
    }
  };

  window.openEditModal = (id, dest, date, notes) => {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-destination").value = dest;
    document.getElementById("edit-date").value = date;
    document.getElementById("edit-notes").value = notes !== 'null' ? notes : '';
    document.getElementById("edit-modal").style.display = "flex";
  };

  document.getElementById("edit-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const dest = document.getElementById("edit-destination").value;
    const date = document.getElementById("edit-date").value;
    const notes = document.getElementById("edit-notes").value;

    try {
      await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest, travel_date: date, add_notes: notes })
      });
      document.getElementById("edit-modal").style.display = "none";
      loadBookings();
    } catch (e) {
      alert("Failed to update booking.");
    }
  });

  loadBookings();
});
