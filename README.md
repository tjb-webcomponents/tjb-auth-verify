# tjb-auth-register

Webcomponents register form field to register with given credentials

## Example

https://tjb-webcomponents.github.io/tjb-auth-register/

## Add to project

You might want to use a Polyfill for WebComponent:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js"></script>
```

### Include via HTML

Include it:

```html
<script
  src="https://tjb-webcomponents.github.io/tjb-auth-register/tjb-auth-register.min.js"
  type="module"
></script>
```

### Include via JavaScript

```JavaScript
import 'https://tjb-webcomponents.github.io/tjb-auth-register/tjb-auth-register.min.js'
```

### Include via NPM

Console:

```bash
npm i -S tjb-auth-register
```

Then in your code:

```JavaScript
import 'tjb-auth-register';
```

## Useage

```html
<tjb-auth-register></tjb-auth-register>
```

### Attributes

Example:

```html
<tjb-auth-register
  postbody="{ 'foo': 'bar' }"
  posturl="https://jsonplaceholder.typicode.com/users"
>
  <input value="register" type="submit" slot="submit" />
</tjb-auth-register>
```

All attributes:

| attribute | example                                              | description                                                                             |
| --------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| postbody  | postbody="{ 'foo': 'bar' }"                          | JSON Object that will be added to the remote register POSt call.                        |
| posturl   | posturl="https://jsonplaceholder.typicode.com/users" | `URL` that will be called with a `POST` call and credentials as `application/json` body |

### Events

| name     | details                                  | description                                                                                  |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| redirect | - href (@String) <br> - target (@string) | triggered when user clicks on links. For instance `register` link or `forgor` password link. |
| success  | - resp (@Object)                         | when the register call returned a success message                                            |
| error    | - resp (@Object)                         | when the register call returned an error message                                             |

You can listen to events like so: `tjbregister.addEventListener('register/success', (e) => { /* do stuff */ })`.

## Styling

Default public values:

```css
:host {
  --background-message-error: #fa354c;
  --color-message-error: white;
  --color-login-info: grey;

  /* input */
  --login-input-color-error: #fa354c;
  --login-input-color-success: limegreen;
  --login-input-padding: 10px;
  --login-input-margin: 0 0 30px 0;
  --login-input-width: 100%;
  --login-input-border: 1px solid transparent;
  --login-input-border-bottom: 1px solid lightgrey;
  --login-input-border-radius: 0;
  --login-input-font-size: 1rem;
  --login-input-info-color: grey;
  --login-input-info-font-size: 0.8rem;
  --login-input-label-margin: 0 0 5px 0;

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
tjb-auth-login {
  --login-input-border: 1px solid lightgrey;
}
```

# Enjoy

[![Typewriter Gif](https://tjb-webcomponents.github.io/html-template-string/typewriter.gif)](http://thibaultjanbeyer.com/)
