document.getElementById("loadNews").addEventListener("click", () => {
    const section = document.getElementById("sectionSelect").value;
  
    // Ask for API key and store it
    let apiKey = sessionStorage.getItem("nytKey");
    if (!apiKey) {
      apiKey = prompt("Enter your NYT API key:");
      sessionStorage.setItem("nytKey", apiKey);
    }
  
    // Build the API URL
    const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
  
    // Fetch data from the NYT API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById("newsContainer");
        container.innerHTML = ""; // Clear old results
  
        const topArticles = data.results.slice(0, 5); // Show only top 5
  
        topArticles.forEach(article => {
          const card = document.createElement("div");
          card.className = "newsCard";
          card.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.abstract}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          container.appendChild(card);
        });
      })
      .catch(error => {
        alert("Error fetching data. Please check your API key or try again later.");
        console.error(error);
      });
  });
  