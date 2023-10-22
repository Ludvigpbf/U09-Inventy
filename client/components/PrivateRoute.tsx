import React, { ReactNode } from "react";
import { Link } from "expo-router";

interface PrivateRouteProps {
  isAuthed: boolean;
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthed, children }) => {
  const currentRoute = window.location.pathname;

  if (isAuthed) {
    // Render the protected content
    return <>{children}</>;
  } else {
    // Redirect to the login screen if not authenticated
    if (currentRoute !== "/index") {
      return <Link href="/index" replace />;
    } else {
      return <>{children}</>;
    }
  }
};

export default PrivateRoute;
