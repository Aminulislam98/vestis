export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Legal
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">
          Terms of Service
        </h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">Using Vestis</p>
            <p className="text-base text-black mt-1">
              By using this website you agree to these terms. You must be 18 or
              over to place an order. We reserve the right to refuse service at
              our discretion.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Orders & Pricing</p>
            <p className="text-base text-black mt-1">
              All prices are in GBP and include VAT. We reserve the right to
              cancel any order if a pricing error occurs. You will be fully
              refunded.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">
              Intellectual Property
            </p>
            <p className="text-base text-black mt-1">
              All content on this site including images, logos, and text is
              owned by Vestis. You may not reproduce or use it without written
              permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
