// Funkcja do otwarcia modala
function openModal(element, title, date, location) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-img").src = element.querySelector("img").src;
  document.getElementById("modal-caption").innerHTML = `
    <h3>${title}</h3>
    <p>Data: ${date}</p>
    <p>Location: ${location}</p>`;
}

// Funkcja do zamknięcia modala
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

//------------------------------------------------------------------------------------------------------------

		
        function toggleBar() {
            const bar = document.getElementById("slideUpBar");
            bar.classList.toggle("show");
        }