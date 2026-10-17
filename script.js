const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
const noResults = document.querySelector("#no-results");

let activeCategory = "tous";

document.querySelector("#year").textContent = new Date().getFullYear();

// Menu mobile
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Recherche et filtrage
function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  let visibleCount = 0;

  products.forEach((product) => {
    const categoryMatches =
      activeCategory === "tous" || product.dataset.category === activeCategory;

    const searchableText =
      `${product.dataset.name} ${product.textContent}`.toLocaleLowerCase("fr");

    const queryMatches = query === "" || searchableText.includes(query);
    const visible = categoryMatches && queryMatches;

    product.hidden = !visible;
    if (visible) visibleCount++;
  });

  noResults.hidden = visibleCount !== 0;
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");
    activeCategory = filter.dataset.filter;
    filterProducts();
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProducts();
  document.querySelector("#produits").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", filterProducts);

// Formulaire de contact : ouvre WhatsApp avec un message préparé.
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // IMPORTANT : remplacez ce numéro par votre numéro WhatsApp réel,
  // au format international, sans + ni espaces.
  const whatsappNumber = "237691952574";

  const name = document.querySelector("#nom").value.trim();
  const phone = document.querySelector("#telephone").value.trim();
  const subject = document.querySelector("#objet").value;
  const message = document.querySelector("#message").value.trim();

  const text =
    `Bonjour JordaneElectronique,\n\n` +
    `Nom : ${name}\nTéléphone : ${phone}\n` +
    `Objet : ${subject}\nMessage : ${message}`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Préremplit le sujet quand un visiteur clique sur une fiche produit.
document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const product = link.dataset.product;
    const subject = document.querySelector("#objet");

    if (product === "Matériel électrique") {
      subject.value = "Matériel électrique";
    } else if (
      product === "Motoculteur" ||
      product === "Motopompe" ||
      product === "Débroussailleuse" ||
      product === "Autres équipements"
    ) {
      subject.value = "Équipement agricole";
    } else if (product === "Groupe électrogène") {
      subject.value = "Équipement industriel";
    }
  });
});
