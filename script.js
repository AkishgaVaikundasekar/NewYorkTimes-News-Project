const apiKey = "kWyFvjeVavzVUAVvPP7Bb75Y0QE3BHIy";
const sectionSelect = document.getElementById("section-select");
const fetchButton = document.getElementById("fetch-news");
const articlesContainer = document.getElementById("articles");

fetchButton.addEventListener("click", () => {
    const section = sectionSelect.value;
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            articlesContainer.innerHTML = ""; 
            const articles = data.results.slice(0, 12); 
            articles.forEach(article => {
                const div = document.createElement("div");
                div.className = "article";
                div.innerHTML = `
                    <img src="${article.multimedia?.[0]?.url || 'https://via.placeholder.com/400x200'}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${article.abstract}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                articlesContainer.appendChild(div);
            });
        })
        .catch(err => {
            articlesContainer.innerHTML = `<p>Error loading articles.</p>`;
            console.error(err);
        });
});
