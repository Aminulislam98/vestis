export function saveViewedProduct(product) {
  const viewed = getViewedProducts();
  const filtered = viewed.filter((p) => p._id !== product._id);
  const updated = [product, ...filtered].slice(0, 10);
  localStorage.setItem("vestis-viewed", JSON.stringify(updated));
}
export function getViewedProducts() {
  try {
    return JSON.parse(localStorage.getItem("vestis-viewed") || "[]");
  } catch {
    return [];
  }
}
