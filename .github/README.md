# cuer

Opinionated QR Code component for React, powered by [`qr`](https://github.com/paulmillr/qr)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/cuer/refs/heads/main/.github/qr-dark.svg">
  <img alt="cuer logo" src="https://raw.githubusercontent.com/wevm/cuer/refs/heads/main/.github/qr-light.svg" width="auto" height="150px">
</picture>

## Install

```sh
npm i cuer
```

## Usage

### Basic

Use the `Cuer` component to render a QR code (with an optional `arena`).

```tsx
import { Cuer } from 'cuer'

export function App() {
  return <Cuer arena="https://example.com/logo.png" value="https://wevm.dev" />
}
```

### Advanced

Further customization is possible by composition components (ie. `Cuer.Root`, `Cuer.Cells`, etc).

```tsx
import { Cuer } from 'cuer'

export function App() {
  return (
    <Cuer.Root value="https://wevm.dev">
      <Cuer.Finder fill="red" radius={0} />
      <Cuer.Cells fill="blue" radius={0} />
      <Cuer.Arena>
        <img
          src="https://example.com/logo.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Cuer.Arena>
    </Cuer.Root>
  )
}
```

## License

[MIT](/LICENSE) License
