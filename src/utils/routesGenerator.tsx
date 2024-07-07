import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TRoutes = {
  name: string;
  path: string;
  element?: ReactNode;
  children?: TRoutes[];
};

export const routesGenerator = (adminPaths: TRoutes[]): TRoute[] => {
  return adminPaths.reduce((acc: TRoute[], item) => {
    if (item.path && !item.children) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.path && item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
};
