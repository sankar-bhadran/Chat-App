"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, FC, useEffect, useState } from "react";

type PrivateProps = {
  children?: ReactNode;
};

const PrivateRoute: FC<PrivateProps> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [localUser, setLocalUser] = useState<string | null>(null);
  const protectedRoutes = ["/chat"];

  useEffect(() => {
    // Ensure localStorage is accessed only on the client
    const storedUser = localStorage.getItem("user");
    setLocalUser(storedUser);
  }, []);

  useEffect(() => {
    if (localUser) {
      if (pathName.includes("/login") || pathName.includes("/registration")) {
        router.push("/");
      }
    } else {
      // Prevent access to protected routes (like /chat) if localUser is null
      if (protectedRoutes.includes(pathName)) {
        router.replace("/");
      }
    }
  }, [pathName, router, localUser]);

  // Render children only if user is authenticated
  if (!localUser && protectedRoutes.includes(pathName)) {
    return null; // Prevents unauthorized content from flashing before redirection
  }

  return <>{children}</>;
};

export default PrivateRoute;
