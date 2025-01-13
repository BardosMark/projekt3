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
    {
        name: "Nettspend",
        listeners: 1700000,
        birth: 2007,
        mostPopularSong: "We Not Like You"
    },
    {
        name: "Osamason",
        listeners: 1300000,
        birth: 2003,
        mostPopularSong: "pop"
    },
    {
        name: "Che",
        listeners: 600000,
        birth: 2004,
        mostPopularSong: "agenda"
    }
];

const currentArtistName = document.title;
const artist = artists.find(a => a.name === currentArtistName);
const artistContainer = document.getElementById('artist-container');

if (artist) {
    artistContainer.innerHTML = `
        <div class="artist">
            <h2>${artist.name}</h2>
            <p><strong>Listeners:</strong> ${artist.listeners.toLocaleString()}</p>
            <p><strong>Birth:</strong> ${artist.birth}</p>
            <p><strong>Most Popular Song:</strong> ${artist.mostPopularSong}</p>
        </div>
    `;
} else {
    artistContainer.innerHTML = `<p>Artist not found.</p>`;
}

function applyFilter() {
    const filter = document.getElementById("filter").value;
    const allImages = document.querySelectorAll(".kepek");

    allImages.forEach(img => {
        img.style.display = "block"; 
    });

    if (filter === "popular") {
        allImages.forEach(img => {
            if (!img.src.includes("nettspend.jpg")) {
                img.style.display = "none"; 
            }
        });
    } else if (filter === "unpopular") {
        allImages.forEach(img => {
            if (!img.src.includes("che.jpg")) {
                img.style.display = "none"; 
            }
        });
    }
}

