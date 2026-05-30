export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Policy
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">Returns</h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">30 Day Returns</p>
            <p className="text-base text-black mt-1">
              Return any item within 30 days of delivery for a full refund.
              Items must be unworn, unwashed, and in original packaging.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">How to Return</p>
            <p className="text-base text-black mt-1">
              Go to your order history, select the item, and click Request
              Return. We will email you a prepaid return label within 24 hours.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Refunds</p>
            <p className="text-base text-black mt-1">
              Refunds are processed within 5–7 working days of receiving your
              return, back to your original payment method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
