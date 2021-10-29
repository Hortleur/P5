/* Recuperation du contenu de l'api et insertion dans le dom */
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(produit => {
        for (const item of produit) {
            document.querySelector("section").innerHTML +=
                `<a href="./product.html?id=${item._id}">
                    <article>
                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                        <h3 class="productName">
                            ${item.name}
                        </h3>
                        <p class="productDescription">
                        ${item.description}
                        </p>
                    </article>
                </a>`
        }
    })