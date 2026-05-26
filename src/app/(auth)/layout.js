import { Toaster } from "sonner";

export const metadata = {
  title: "Account | Vestis",
  description: "Sign in or create your Vestis account",
};

export default function AuthLayout({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "font-sans text-base rounded-none border border-black/10",
            title: "font-black uppercase tracking-wide text-base",
            description: "text-base text-black/60",
          },
        }}
      />
    </>
  );
}
