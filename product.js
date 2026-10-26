const productDetail = document.querySelector(".product-detail");
const shoppingBag = document.querySelector(".shopping-bag");
const bagCount = document.querySelector(".bag-count");
const storageKey = "forma-shopping-bag";

function getBagItems() {
  const storedItems = localStorage.getItem(storageKey);
  if (!storedItems) {
    return [];
  }

  const parsedItems = JSON.parse(storedItems);
  if (!Array.isArray(parsedItems)) {
    throw new Error("Savat ma’lumotlari noto‘g‘ri formatda.");
  }

  return parsedItems.filter(
    (item) =>
      productCatalog.some((product) => product.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
}

function saveBagItems(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function updateBagCount(items) {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  bagCount.textContent = String(count);
  bagCount.hidden = count === 0;
}

function showStorageError(statusElement) {
  statusElement.textContent =
    "Savat xotirasiga kira olmadik. Brauzer sozlamalarida mahalliy saqlashga ruxsat bering.";
}

function renderProduct(product) {
  document.title = `${product.name} — iPhone_shop`;
  document.querySelector(".product-category").textContent = product.category;
  document.querySelector("#product-name").textContent = product.name;
  document.querySelector(".product-subtitle").textContent = product.subtitle;
  document.querySelector(".product-description").textContent = product.description;
  document.querySelector(".product-finish").textContent = `Dizayn: ${product.finish}`;

  const image = document.querySelector(".product-detail-image");
  image.src = product.image;
  image.alt = product.alt;

  const highlights = document.querySelector(".product-highlights");
  product.details.forEach((detail) => {
    const item = document.createElement("li");
    item.textContent = detail;
    highlights.append(item);
  });

  const status = document.querySelector(".purchase-status");
  document.querySelector(".add-to-bag").addEventListener("click", () => {
    try {
      const items = getBagItems();
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= 99) {
          status.textContent = "Bir mahsulotdan savatga ko‘pi bilan 99 dona qo‘shish mumkin.";
          return;
        }
        existingItem.quantity += 1;
      } else {
        items.push({ id: product.id, quantity: 1 });
      }
      saveBagItems(items);
      window.location.href = "product.html?view=bag";
    } catch {
      showStorageError(status);
    }
  });
}

function renderBag() {
  productDetail.hidden = true;
  shoppingBag.hidden = false;
  document.title = "Savat — iPhone_shop";

  const itemsContainer = document.querySelector(".bag-items");
  const emptyMessage = document.querySelector(".bag-empty");
  const status = document.querySelector(".bag-status");
  const checkoutActions = document.querySelector(".checkout-actions");
  const checkoutForm = document.querySelector(".checkout-form");
  const checkoutOpen = document.querySelector(".checkout-open");
  const checkoutSubmit = document.querySelector(".checkout-submit");
  const checkoutProgress = document.querySelector(".checkout-progress");
  const checkoutError = document.querySelector(".checkout-error");
  const checkoutNote = document.querySelector(".bag-checkout-note");

  checkoutOpen.addEventListener("click", () => {
    checkoutForm.hidden = false;
    checkoutActions.hidden = true;
    checkoutError.hidden = true;
    checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
    checkoutForm.querySelector("input").focus({ preventScroll: true });
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!checkoutForm.reportValidity()) {
      return;
    }

    checkoutSubmit.disabled = true;
    checkoutProgress.hidden = false;
    checkoutError.hidden = true;
    window.setTimeout(() => {
      checkoutProgress.hidden = true;
      checkoutSubmit.disabled = false;
      checkoutError.hidden = false;
      checkoutError.classList.remove("is-visible");
      requestAnimationFrame(() => checkoutError.classList.add("is-visible"));
      checkoutError.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 850);
  });

  function refreshBag() {
    let items;
    try {
      items = getBagItems();
    } catch {
      showStorageError(status);
      return;
    }

    updateBagCount(items);
    itemsContainer.replaceChildren();
    emptyMessage.hidden = items.length > 0;
    checkoutActions.hidden = items.length === 0;
    checkoutNote.hidden = items.length === 0;
    if (items.length === 0) {
      checkoutForm.hidden = true;
      checkoutOpen.hidden = false;
      checkoutError.hidden = true;
    }

    items.forEach((item) => {
      const product = productCatalog.find((entry) => entry.id === item.id);
      const row = document.createElement("article");
      row.className = "bag-item";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.alt;
      image.loading = "lazy";

      const details = document.createElement("div");
      details.className = "bag-item-details";
      const title = document.createElement("h2");
      title.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.subtitle;
      details.append(title, description);

      const quantity = document.createElement("label");
      quantity.className = "bag-quantity";
      quantity.textContent = "Soni ";
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.min = "1";
      quantityInput.max = "99";
      quantityInput.value = String(item.quantity);
      quantityInput.setAttribute("aria-label", `${product.name} soni`);
      quantityInput.addEventListener("change", () => {
        const nextQuantity = Number.parseInt(quantityInput.value, 10);
        if (!Number.isInteger(nextQuantity) || nextQuantity < 1 || nextQuantity > 99) {
          quantityInput.value = String(item.quantity);
          status.textContent = "Miqdor 1 va 99 oralig‘ida bo‘lishi kerak.";
          return;
        }

        try {
          const latestItems = getBagItems();
          const currentItem = latestItems.find((entry) => entry.id === item.id);
          if (!currentItem) {
            refreshBag();
            return;
          }
          currentItem.quantity = nextQuantity;
          saveBagItems(latestItems);
          status.textContent = "";
          refreshBag();
        } catch {
          showStorageError(status);
        }
      });
      quantity.append(quantityInput);

      const removeButton = document.createElement("button");
      removeButton.className = "bag-remove";
      removeButton.type = "button";
      removeButton.textContent = "O‘chirish";
      removeButton.addEventListener("click", () => {
        try {
          const latestItems = getBagItems().filter((entry) => entry.id !== item.id);
          saveBagItems(latestItems);
          status.textContent = `${product.name} savatdan olib tashlandi.`;
          refreshBag();
        } catch {
          showStorageError(status);
        }
      });

      row.append(image, details, quantity, removeButton);
      itemsContainer.append(row);
    });
  }

  refreshBag();
}

const params = new URLSearchParams(window.location.search);
if (params.get("view") === "bag") {
  renderBag();
} else {
  const product = productCatalog.find((item) => item.id === params.get("product"));
  if (!product) {
    window.location.replace("store.html");
  } else {
    renderProduct(product);
    try {
      updateBagCount(getBagItems());
    } catch {
      showStorageError(document.querySelector(".purchase-status"));
    }
  }
}
