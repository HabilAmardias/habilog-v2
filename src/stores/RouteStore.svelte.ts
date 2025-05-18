export type RouteStateType = "Home" | "About";

export interface RouterItf {
  router: {
    routeState: RouteStateType;
    changeRoute: (newRoute: RouteStateType) => void;
  };
}

class Router {
  routeState = $state<RouteStateType>("Home");
  constructor() {}
  changeRoute(newRoute: RouteStateType) {
    this.routeState = newRoute;
  }
}

export default new Router();
