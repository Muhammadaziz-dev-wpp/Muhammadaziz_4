const storeGrid = document.querySelector(".store-grid");
const bagCount = document.querySelector(".bag-count");
const storageKey = "forma-shopping-bag";

function readBag() {
  const value = localStorage.getItem(storageKey);
  if (!value) {
    return [];
  }

  const items = JSON.parse(value);
  if (!Array.isArray(items)) {
    throw new Error("Savat ma’lumotlari noto‘g‘ri formatda.");
  }

  return items.filter(
    (item) =>
      productCatalog.some((product) => product.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
}

function saveBag(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function renderBagCount() {
  try {
    const count = readBag().reduce((total, item) => total + item.quantity, 0);
    bagCount.textContent = String(count);
    bagCount.hidden = count === 0;
  } catch {
    const status = document.querySelector(".store-status");
    status.textContent = "Savatni o‘qib bo‘lmadi. Brauzer sozlamalarini tekshiring.";
  }
}

function renderProducts() {
  productCatalog.forEach((product) => {
    const card = document.createElement("article");
    card.className = "store-card";

    const imageLink = document.createElement("a");
    imageLink.className = "store-card-image";
    imageLink.href = `product.html?product=${encodeURIComponent(product.id)}`;
    imageLink.setAttribute("aria-label", `${product.name} haqida batafsil`);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.loading = "lazy";
    imageLink.append(image);

    const info = document.createElement("div");
    info.className = "store-card-info";
    const category = document.createElement("p");
    category.className = "eyebrow";
    category.textContent = product.category;
    const name = document.createElement("h2");
    const nameLink = document.createElement("a");
    nameLink.href = imageLink.href;
    nameLink.textContent = product.name;
    name.append(nameLink);
    const subtitle = document.createElement("p");
    subtitle.className = "store-card-subtitle";
    subtitle.textContent = product.subtitle;
    const actions = document.createElement("div");
    actions.className = "store-card-actions";

    const detailsLink = document.createElement("a");
    detailsLink.className = "text-link";
    detailsLink.href = imageLink.href;
    detailsLink.innerHTML = "Batafsil <span aria-hidden=\"true\">→</span>";

    const buyButton = document.createElement("button");
    buyButton.className = "button button-dark store-buy";
    buyButton.type = "button";
    buyButton.innerHTML = "Xarid qilish <span aria-hidden=\"true\">→</span>";
    buyButton.addEventListener("click", () => {
      try {
        const items = readBag();
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          if (existingItem.quantity >= 99) {
            document.querySelector(".store-status").textContent =
              "Bir mahsulotdan savatga ko‘pi bilan 99 dona qo‘shish mumkin.";
            return;
          }
          existingItem.quantity += 1;
        } else {
          items.push({ id: product.id, quantity: 1 });
        }
        saveBag(items);
        window.location.href = "product.html?view=bag";
      } catch {
        document.querySelector(".store-status").textContent =
          "Mahsulot savatga qo‘shilmadi. Brauzer sozlamalarida mahalliy saqlashga ruxsat bering.";
      }
    });

    actions.append(detailsLink, buyButton);
    info.append(category, name, subtitle, actions);
    card.append(imageLink, info);
    storeGrid.append(card);
  });

  const status = document.createElement("p");
  status.className = "store-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  storeGrid.after(status);
}

renderProducts();
renderBagCount();
