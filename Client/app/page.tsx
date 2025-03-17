import LoginForm from "@/components/login-form";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            ChatAI
          </h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
