import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
}