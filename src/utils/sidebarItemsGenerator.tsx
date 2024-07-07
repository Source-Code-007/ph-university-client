import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
  type TRoute = {
    key: string;
    label: ReactNode;
    children?:  TRoute[];
  };
  
  type TRoutes = {
    name: string;
    path: string;
    element?: ReactNode;
    children?: TRoutes[];
  };
export const sidebarItemsGenerator = (items: TRoutes[]) => {
    return items.reduce((acc:TRoute[], item) => {

        if(item.name && item.path && !item.children){
            acc.push({
                key: item.name,
                label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
            })
        }

        if(item.name && item.children){

            acc.push({
                key: item.name,
                label: item.name,
                children: item.children.map((child:TRoutes)=> ({
                    key: child.name,
                    label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
                })) 
            })

        }


        return acc
    }, [])
}