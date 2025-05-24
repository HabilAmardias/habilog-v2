export interface RouterItf {
  routeState: string;
  changeRoute: (newRoute: string) => void;
}

class Router {
  routeState = $state<string>("Home");
  constructor() {

  }
  changeRoute(newRoute: string) {
    this.routeState = newRoute;
  }
}

export default new Router();
