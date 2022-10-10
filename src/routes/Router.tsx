import routes from "./routes";
import { useOutlet, useLocation, createHashRouter } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from "react-transition-group";

function Temp() {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const { pathname } = location;
  const { nodeRef } =
    routes.find((route) => route.path === pathname) ?? {};

  return (
    <div className="App">
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames={'page'}
          unmountOnExit
        >
          <div ref={nodeRef} className="page">
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

const Router = createHashRouter([
  {
    path: '/',
    element: <Temp />,
    children: routes.map((route) => ({
      // 一级路由
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
      children: route.children?.map((son) => ({
        // 二级路由
        index: son.path === '/',
        path: son.path === '/' ? undefined : son.path,
        element: son.element,
        children: son.children?.map((grandson) => ({
          // 三级路由
          index: grandson.path === '/',
          path: grandson.path === '/' ? undefined : grandson.path,
          element: grandson.element,
          children: grandson.children?.map((great_grandson) => ({
            //四级路由
            index: great_grandson.path === '/',
            path: great_grandson.path === '/' ? undefined : great_grandson.path,
            element: great_grandson.element,
          }))
        }))
      }))
    })),
  },
])

export default Router;

