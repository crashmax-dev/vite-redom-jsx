import type { RedomComponent, RedomEl } from 'redom-jsx'

export function Element() {
  const el = (
    <div>
      <span>{Math.random().toString(16).slice(2)}</span>
      <button onclick={() => el.remove()}>Delete</button>
    </div>
  )

  return el
}

export function Elements({ app }: { app: App }) {
  return <button onclick={() => app.el.appendChild(<Element />)}>Add</button>
}

export class App implements RedomComponent {
  el: RedomEl

  constructor() {
    <div this="el">
      <Elements app={this} />
    </div>
  }
}
