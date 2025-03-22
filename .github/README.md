# Cuer

Opinionated QR Code component for React

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
