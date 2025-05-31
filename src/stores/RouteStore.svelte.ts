export interface RouterItf {
  routeState: string;
  changeRoute: (newRoute: string) => void;
}

class Router {
  routeState = $state<string>("Home");
  constructor() {
    const route = localStorage.getItem("route");
    if (route) {
      this.routeState = route;
    }
  }
  changeRoute(newRoute: string) {
    localStorage.setItem("route", newRoute);
    this.routeState = newRoute;
  }
}

export default new Router();
