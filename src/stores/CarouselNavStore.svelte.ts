export interface CarouselNavItf {
  navState: string;
  changeState: (newState: string) => void;
}
  
class CarouselNavigator {
  navState = $state<string>("SISR");
  constructor() {
  }
  changeState(newState: string) {
    this.navState = newState;
  }
}
  
export default new CarouselNavigator();