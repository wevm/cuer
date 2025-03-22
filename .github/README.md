# cuer

Opinionated QR Code for React

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./qr-dark.svg">
  <img alt="cuer logo" src="./qr-light.svg" width="auto" height="150px">
</picture>

## Install

```sh
npm i cuer
```

## Usage

### Basic

```tsx
import { Cuer } from 'cuer'

export function App() {
  return <Cuer value="https://wevm.dev" />
}
```

### Customize

```tsx
import { Cuer } from 'cuer'

export function App() {
  return (
    <Cuer.Root value="https://wevm.dev">
      <Cuer.Finder fill="red" radius={0} />
      <Cuer.Cells fill="blue" radius={0} />
      <Cuer.Arena>
        <img src="https://example.com/logo.png" />
      </Cuer.Arena>
    </Cuer.Root>
  )
}
```
