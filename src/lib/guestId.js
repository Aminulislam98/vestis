export function getGuestId() {
  let guestId = localStorage.getItem("vestis-guest-id");
  if (!guestId) {
    guestId = "guest_" + crypto.randomUUID();
    localStorage.setItem("vestis-guest-id", guestId);
  }
  return guestId;
}
