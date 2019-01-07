# tjb-auth-verify

Webcomponents verify form field to verify with given credentials

## Example

https://tjb-webcomponents.github.io/tjb-auth-verify/

## Add to project

You might want to use a Polyfill for WebComponent:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js"></script>
```

### Include via HTML

Include it:

```html
<script
  src="https://tjb-webcomponents.github.io/tjb-auth-verify/tjb-auth-verify.min.js"
  type="module"
></script>
```

### Include via JavaScript

```JavaScript
import 'https://tjb-webcomponents.github.io/tjb-auth-verify/tjb-auth-verify.min.js'
```

### Include via NPM

Console:

```bash
npm i -S tjb-auth-verify
```

Then in your code:

```JavaScript
import 'tjb-auth-verify';
```

## Useage

```html
<tjb-auth-verify></tjb-auth-verify>
```

### Attributes

Example:

```html
<tjb-auth-verify
  postbody="{ 'foo': 'bar' }"
  posturl="https://jsonplaceholder.typicode.com/users"
  mailurl="https://jsonplaceholder.typicode.com/users"
  email="foo@bar.baz"
>
  <input value="verify" type="submit" slot="submit" />
</tjb-auth-verify>
```

All attributes:

| attribute | example                                              | description                                                                                                                     |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| postbody  | postbody="{ 'foo': 'bar' }"                          | JSON Object that will be added to the remote verify POSt call.                                                                  |
| posturl   | posturl="https://jsonplaceholder.typicode.com/users" | `URL` that will be called with a `POST` call and credentials as `application/json` body                                         |
| mailurl   | mailurl="https://jsonplaceholder.typicode.com/users" | `URL` that will be called with a `POST` call as `application/json` body. The component will send out a `POST` on initialization |
| email     | email="foo@bar.baz"                                  | E-Mail that will be used for calls                                                                                              |

### Events

| name          | details                                  | description                                                                                |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| redirect      | - href (@String) <br> - target (@string) | triggered when user clicks on links. For instance `verify` link or `forgor` password link. |
| success       | - resp (@Object)                         | when the verify (post) call returned a success message                                     |
| success-email | - resp (@Object)                         | when the email call returned a success message                                             |
| error         | - resp (@Object)                         | when the verify (post) call returned an error message                                      |

You can listen to events like so: `tjbVerify.addEventListener('verify/success', (e) => { /* do stuff */ })`.

## Styling

Default public values:

```css
:host {
  --verify-color-info: grey;

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
```

These can be overwritten easily by targetting the element. Example:

```css
tjb-auth-verify {
  --veridy-input-border: 1px solid lightgrey;
}
```

# Enjoy

[![Typewriter Gif](https://tjb-webcomponents.github.io/html-template-string/typewriter.gif)](http://thibaultjanbeyer.com/)
