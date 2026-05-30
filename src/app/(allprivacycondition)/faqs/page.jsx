export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Support
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">FAQs</h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">
              How do I track my order?
            </p>
            <p className="text-base text-black mt-1">
              Once dispatched you will receive an email with a tracking link.
              You can also visit the Track Order page anytime.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">
              Can I change or cancel my order?
            </p>
            <p className="text-base text-black mt-1">
              Orders can be changed or cancelled within 1 hour of placing them.
              Contact us immediately and we will do our best to help.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">
              What sizes do you stock?
            </p>
            <p className="text-base text-black mt-1">
              We stock XS to XXL for clothing and UK 6 to UK 12 for shoes. Check
              the Size Guide on any product page for full measurements.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">
              Do you ship internationally?
            </p>
            <p className="text-base text-black mt-1">
              We currently ship within the UK only. International shipping is
              coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
