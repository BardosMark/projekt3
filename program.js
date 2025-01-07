document.addEventListener("DOMContentLoaded", () => {
    fetchArtists();

    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", applyFilter);
});

async function fetchArtists() {
    try {
        const response = await fetch(""); 
        const artists = await response.json();
        displayArtists(artists);
    } catch (error) {
        console.error("Error fetching artists:", error);
    }
}

function displayArtists(artists) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    artists.forEach(artist => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${artist.image_url}" alt="${artist.name}">
            <h2>${artist.name}</h2>
            <p>Született: ${artist.birth_date}</p>
            <p>Hallgatók száma: ${artist.listeners}</p>
            <a href="/artist/${artist.id}" target="_blank">Részletek</a>
        `;
        container.appendChild(card);
    });
}

function applyFilter() {
    const filter = document.getElementById("filter").value;
    fetchArtists().then(() => {
        if (filter !== "all") {
            const allCards = document.querySelectorAll(".card");
            allCards.forEach(card => {
                const listeners = parseInt(card.querySelector("p:nth-of-type(2)").innerText.split(": ")[1], 10);
                if (filter === "popular" && listeners < 1000) {
                    card.style.display = "none";
                } else if (filter === "underground" && listeners >= 1000) {
                    card.style.display = "none";
                } else {
                    card.style.display = "block";
                }
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    const recommendationBtn = document.getElementById("recommendation-btn");
    recommendationBtn.addEventListener("click", redirectToRandomPage);
});

function redirectToRandomPage() {
    
    const pages = ["nettspend.html", "osamason.html", "che.html"];
   
    const randomIndex = Math.floor(Math.random() * pages.length);
    
    window.location.href = pages[randomIndex];
}

document.addEventListener("DOMContentLoaded", () => {
    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", applyFilter);
});


const artists = [
    { name: "Nettspend", listeners: 1700000, image: "nettspend.jpg", link: "nettspend.html" },
    { name: "Osamason", listeners: 1300000, image: "osamason.jpg", link: "osamason.html" },
    { name: "Che", listeners: 600000, image: "che.jpg", link: "che.html" }
];

function applyFilter() {
    const filter = document.getElementById("filter").value;
    const mainContainer = document.querySelector("main");

  
    mainContainer.innerHTML = "";

   
    let filteredArtists;
    if (filter === "popular") {
        filteredArtists = artists.filter(artist => artist.listeners >= 1000000); // Popular artists
    } else if (filter === "unpopular") {
        filteredArtists = artists.filter(artist => artist.listeners < 1000000); // Less popular artists
    } else {
        filteredArtists = artists; 
    }

   
    filteredArtists.forEach(artist => {
        const artistElement = document.createElement("a");
        artistElement.href = artist.link;
        artistElement.innerHTML = `<img src="${artist.image}" alt="${artist.name}" class="kepek">`;
        mainContainer.appendChild(artistElement);
    });
}
