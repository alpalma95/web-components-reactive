import { ReactiveWC } from "../../../assets/reactive-wc.js";
import { userService } from "../services/userService.js";

export class ListComponent extends ReactiveWC {
  constructor() {
    super();

    this.state = this.defineState({
      users: [],
    });
  }

  onInit() {
    userService.getUsers();
    userService.users.subscribe((val) => (this.state.users = val));

    // This is increasing the count calling a method within userService. The value is
    // then reflected inside the counter of the cards
    setInterval(() => {
      userService.inc();
    }, 1000);
  }

  render() {
    const elements = {
      SPINNER: /*html*/ `<div class="spinner"></div>`,
      ERROR_MESSAGE: /*html*/ `<error-message></error-message>`,
    };

    if (this.state.users.length == 0) {
      return elements["SPINNER"];
    }

    if (this.state.users == "KO") {
      return elements["ERROR_MESSAGE"];
    }

    // This is awfully awkward, I need to change the way we loop,
    // as well as the way we pass objects as props. In this case,
    // it is mandatory to pass the prop between single quotation marks.
    return this.state.users
      .map(
        (user) => /*html*/ ` 
        
            <card-component data_user='${JSON.stringify(
              user
            )}'></card-component>
            
            `
      )
      .join(" ");
  }
}
