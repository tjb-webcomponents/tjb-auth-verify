import WebComponent from "https://tjb-webcomponents.github.io/tjb-webcomponent/tjb-wc.min.js";
import html from "https://tjb-webcomponents.github.io/html-template-string/html-template-string.js";
import { bounce, shake } from "https://tjb-webcomponents.github.io/tjb-gfx/tjb-gfx.min.js";
import "https://tjb-webcomponents.github.io/tjb-input/tjb-input.min.js";
import "https://tjb-webcomponents.github.io/tjb-statusbar/tjb-statusbar.min.js";
import "https://tjb-webcomponents.github.io/tjb-notify/tjb-notify.min.js";

class tjbAuthVerify extends WebComponent() {
  // Styles
  ////////////////////////////////////////////////////////////

  CSS() {
    return html`
      <style>
        :host {
          --color-info: grey;

          /* notify */
          --verify-notify-background-error: #fa354c;
          --verify-notify-background-success: limegreen;
          --verify-notify-color-error: white;
          --verify-notify-color-success: white;
          --verify-notify-margin: -55px -40px 20px;
          --verify-notify-padding: 15px 15px 15px 35px;

          /* input */
          --verify-input-color-error: #fa354c;
          --verify-input-color-success: limegreen;
          --verify-input-padding: 10px;
          --verify-input-margin: 0 0 30px 0;
          --verify-input-width: 100%;
          --verify-input-border: 1px solid transparent;
          --verify-input-border-bottom: 1px solid lightgrey;
          --verify-input-border-radius: 0;
          --verify-input-font-size: 1rem;
          --verify-input-info-color: grey;
          --verify-input-info-font-size: 0.8rem;
          --verify-input-label-margin: 0 0 5px 0;

          background: #fff;
          display: block;
          max-width: 350px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          padding: 55px 40px 10px;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
        }

        tjb-input {
          --input-color-error: var(--verify-input-color-error);
          --input-color-success: var(--verify-input-color-success);
          --input-padding: var(--verify-input-padding);
          --input-margin: var(--verify-input-margin);
          --input-width: var(--verify-input-width);
          --input-border: var(--verify-input-border);
          --input-border-bottom: var(--verify-input-border-bottom);
          --input-border-radius: var(--verify-input-border-radius);
          --input-font-size: var(--verify-input-font-size);
          --input-info-color: var(--verify-input-info-color);
          --input-info-font-size: var(--verify-input-info-font-size);
          --input-label-margin: var(--verify-input-label-margin);
        }

        tjb-notify {
          --notify-background-error: var(--verify-notify-background-error);
          --notify-background-success: var(--verify-notify-background-success);
          --notify-color-error: var(--verify-notify-color-error);
          --notify-color-success: var(--verify-notify-color-success);
          --notify-margin: var(--verify-notify-margin);
          --notify-padding: var(--verify-notify-padding);
        }

        .fieldset {
          margin-bottom: 30px;
        }

        .fieldset--center {
          text-align: center;
        }

        .info {
          text-align: center;
          margin-bottom: 10px;
          color: var(--color-info);
        }

        .footnote {
          text-align: center;
        }
      </style>
    `;
  }

  // Markup
  ////////////////////////////////////////////////////////////

  HTML() {
    this.statusbar = html`
      <tjb-statusbar></tjb-statusbar>
    `;

    this.emailInput = html`
      <tjb-input
        onchange="${this._closeEmail.bind(this)}"
        label="Email"
        type="email"
        name="email"
        required="true"
        value="${this.email || ""}"
        ${this.email ? "disabled='true'" : ""}
      ></tjb-input>
    `;

    this.keyInput = html`
      <tjb-input
        label="Key"
        type="text"
        name="key"
        info="Enter the key you got via email here:"
        pattern=".{4,}"
        required="true"
        errormessage="Please check the key"
      ></tjb-input>
    `;

    this.messageNode = html`
      <tjb-notify></tjb-notify>
    `;

    return html`
      <form class="verify__form" onsubmit="${e => this.fetchHandler(e)}">
        ${this.messageNode}
        <div class="fieldset">
          <div class="info">Enter the email key for verification:</div>
        </div>
        <div class="fieldset">
          ${this.emailInput} ${this.keyInput}
          <slot name="submit" onclick="${e => this.fetchHandler(e)}"></slot>
          <div class="footnote">
            <div>
              <a href="#resend" class="link" onclick="${e => this.sendMail(e)}"
                >Resend Key</a
              >
              |
              <a
                href="#change"
                class="link"
                onclick="${this._openEmail.bind(this)}"
                >Change E-Mail</a
              >
            </div>
          </div>
        </div>
        ${this.statusbar}
      </form>
    `;
  }

  // Attribute Handling
  ////////////////////////////////////////////////////////////

  static get observedAttributes() {
    return ["postbody", "posturl", "mailurl", "email", "showkey"];
  }

  connectedCallback() {
    super.connectedCallback();

    this.sendMail();

    // rerenders
    this.handleShowkeyChange = this.reRender;
    this.handleEmailChange = this.reRender;
  }

  // Logic
  ////////////////////////////////////////////////////////////

  _closeEmail(e) {
    this.emailInput.disabled = true;
    this.sendMail(e);
  }

  _openEmail() {
    this.emailInput.disabled = false;
    this.emailInput.focus();
  }

  checkValidity() {
    const toCheck = [];
    if (this.emailInput) toCheck.push(this.emailInput.checkValidity());
    if (this.keyInput) toCheck.push(this.keyInput.checkValidity());
    if (this.passwordInput) toCheck.push(this.passwordInput.checkValidity());
    return toCheck.every(check => check);
  }

  openHandler(event, target) {
    event.preventDefault();
    bounce(event.target, this._location.bind(this, event.target.href, target));
  }

  _location(href, target) {
    if (target === "verify") return this.showkey = false;
    this.dispatchEvent("redirect", {
      href,
      target
    });
  }

  // Async Logic
  ////////////////////////////////////////////////////////////

  sendMail(event) {
    if (event) event.preventDefault();

    this.email = this.email || this.emailInput.value;

    if (!this.email) return false;

    const postbody = this.postbody && this.postbody.replace(/\'/g, '"');
    const body = JSON.parse(postbody || "{}");
    body.email = this.email;

    return fetch(this.mailurl, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    }).then(resp => resp.json()).then(resp => {
      if (resp.error) throw resp;
      return this._successSend(resp);
    }).catch(resp => this._error(resp));
  }

  _successSend(resp) {
    console.log("successfully send email", resp);
    this.messageNode.success = `
      Email send to ${this.email}
    `;
    return this.dispatchEvent("success-email", resp);
  }

  fetchHandler(event) {
    event.preventDefault();

    if (!this.checkValidity()) return false;

    this.statusbar.status = "loading";

    this.email = this.email || this.emailInput.value;
    this.key = this.key || this.keyInput.value;

    const postbody = this.postbody && this.postbody.replace(/\'/g, '"');
    const body = JSON.parse(postbody || "{}");
    body.email = this.email;
    body.key = this.key;

    return fetch(this.posturl, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    }).then(resp => resp.json()).then(resp => {
      if (resp.error) throw resp;
      return this._success(resp);
    }).catch(resp => this._error(resp));
  }

  _success(resp) {
    console.log("success", resp);
    bounce(this.domNode, () => {
      if (!this.showkey) return this.showkey = true;
      return this.dispatchEvent("success", resp);
    });
  }

  _error(resp) {
    console.error("error", resp);
    this.dispatchEvent("error", resp);
    this.errorHandler();
  }

  errorHandler() {
    this.writeMessageError = this.writeMessageError.bind(this);
    this.statusbar.status = "alert";
    this.addEventListener("animationend", this.writeMessageError);
    shake(this);
  }

  writeMessageError() {
    this.domNode.removeEventListener("animationend", this.writeMessageError);

    this.messageNode.error = !this.showkey ? html`
          <ul>
            <li>
              <a
                type="button"
                onclick="${this._openEmail.bind(this)}"
                class="message__link"
              >
                Wrong email
              </a>
            </li>
            <li>
              Don’t have an account yet?
              <a
                onclick="${e => this.openHandler(e, "login")}"
                href="#login"
                class="message__link"
                >Login here</a
              >
            </li>
          </ul>
        ` : html`
          <ul>
            <li>
              <a
                onclick="${() => this.keyInput.inputNode.focus()}"
                href="#"
                class="message__link"
                >Wrong Key</a
              >
              or
              <a
                onclick="${() => this.passwordInput.inputNode.focus()}"
                href="#"
                class="message__link"
                >Invalid Password</a
              >
            </li>
          </ul>
        `;

    if (this.emailInput) this.emailInput.showMessage("error");
    if (this.keyInput) this.keyInput.showMessage("error");
    if (this.passwordInput) this.passwordInput.showMessage("error");
  }
}

customElements.define("tjb-auth-verify", tjbAuthVerify);
