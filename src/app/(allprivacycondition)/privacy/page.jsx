export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Legal
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">Privacy Policy</h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">What we collect</p>
            <p className="text-base text-black mt-1">
              We collect your name, email, shipping address, and payment details
              when you place an order. We do not store full card details.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">How we use it</p>
            <p className="text-base text-black mt-1">
              Your data is used to process orders, send delivery updates, and
              improve your experience. We never sell your data to third parties.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Your rights</p>
            <p className="text-base text-black mt-1">
              You can request access to, correction of, or deletion of your
              personal data at any time by emailing privacy@vestis.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
