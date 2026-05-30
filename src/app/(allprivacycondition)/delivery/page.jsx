export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Shipping
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">Delivery Info</h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">Standard Delivery</p>
            <p className="text-base text-black mt-1">
              3–5 working days · £3.99
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Express Delivery</p>
            <p className="text-base text-black mt-1">
              Next working day · £6.99
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Free Delivery</p>
            <p className="text-base text-black mt-1">
              On all orders over £50 · automatically applied at checkout
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Order Tracking</p>
            <p className="text-base text-black mt-1">
              A tracking link is emailed once your order is dispatched. Orders
              placed before 2pm ship the same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
