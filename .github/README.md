# cuer

Opinionated QR Code for React

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/cuer/main/.github/qr-dark.svg">
    <img alt="cuer logo" src="https://raw.githubusercontent.com/wevm/cuer/main/.github/qr-light.svg" width="auto" height="60">
  </picture>
</p>

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
    </Cuer.Root>
  )
}
```
