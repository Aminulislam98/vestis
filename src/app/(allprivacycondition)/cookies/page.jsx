export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-black mb-4">
          Legal
        </p>
        <h1 className="text-5xl font-bold text-black mb-10">Cookie Policy</h1>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-black">What are cookies</p>
            <p className="text-base text-black mt-1">
              Cookies are small text files stored on your device when you visit
              our site. They help us remember your preferences and improve your
              experience.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">What we use</p>
            <p className="text-base text-black mt-1">
              We use essential cookies to keep your cart and session active, and
              analytics cookies to understand how people use our site. We do not
              use advertising cookies.
            </p>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <p className="text-2xl font-bold text-black">Managing cookies</p>
            <p className="text-base text-black mt-1">
              You can disable cookies in your browser settings at any time. Note
              that disabling essential cookies may affect how the site
              functions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
