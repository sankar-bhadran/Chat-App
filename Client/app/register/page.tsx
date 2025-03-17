"use client";
import RegisterForm from "@/components/register-form";

export default function RegistrationForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            ChatAI
          </h1>
          <p className="mt-2 text-muted-foreground">Sign Up to your account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
