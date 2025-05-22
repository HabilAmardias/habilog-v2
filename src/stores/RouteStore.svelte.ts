export interface RouterItf {
  routeState: string;
  changeRoute: (newRoute: string) => void;
}

class Router {
  routeState = $state<string>("");
  constructor() {
    const route = localStorage.getItem("route");
    this.routeState = route ? route : "Home";
  }
  changeRoute(newRoute: string) {
    localStorage.setItem("route", newRoute);
    this.routeState = newRoute;
  }
}

export default new Router();
