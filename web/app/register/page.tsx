import { useSession } from "next-auth/react";
import { RegisterForm } from "./form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") return router.push("/");

  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
