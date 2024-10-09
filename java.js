document.addEventListener("DOMContentLoaded", function() {
    // Az összes navigációs link megkeresése és az események hozzárendelése
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Alapértelmezett viselkedés (pl. ugrás) letiltása
            const targetId = this.getAttribute('href').substring(1); // Lekéri a hivatkozott id-t (# nélkül)
            const targetElement = document.getElementById(targetId); // Megkeresi a célt az id alapján
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Zökkenőmentes görgetés
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const recipeContainer = document.getElementById("recipeContainer");

    // API URL
    const apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

    // API hívás
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const meal = data.meals[0];
            const recipeHTML = `
                <h3>Megéheztél? Íme valami amit ma főzhetsz!</h3>
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 200px; height: auto;">
                <p><strong>Összetevők:</strong></p>
                <ul>
                    ${Object.keys(meal)
                        .filter(key => key.startsWith('strIngredient') && meal[key])
                        .map(key => `<li>${meal[key]} - ${meal[`strMeasure${key.slice(13)}`]}</li>`)
                        .join('')}
                </ul>
                <p><strong>Elkészítési mód:</strong> ${meal.strInstructions}</p>
                <p><a href="${meal.strSource}" target="_blank">Eredeti recept link</a></p>
            `;
            recipeContainer.innerHTML = recipeHTML;
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
            recipeContainer.innerHTML = "<p>Hiba történt a recept betöltésekor.</p>";
        });
});

