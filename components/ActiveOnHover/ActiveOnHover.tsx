import { Component, RefObject, createRef } from "react"

interface ActiveOnHoverProps {
  activeClass: string
  render: (arg: ActiveOnHover) => JSX.Element
}

class ActiveOnHover extends Component<ActiveOnHoverProps> {
  elementRef: RefObject<HTMLDivElement>

  activeClass: string

  timeOut: NodeJS.Timeout

  state: {
    currentClass: string
  }

  constructor(props: ActiveOnHoverProps) {
    super(props)

    this.elementRef = createRef<HTMLDivElement>()
    this.activeClass = this.props.activeClass
    this.timeOut = undefined
    this.state = {
      currentClass: "",
    }

    // Ah yes, what `this`?
    this.onHoverEnter = this.onHoverEnter.bind(this)
    this.onHoverOut = this.onHoverOut.bind(this)
  }

  componentDidMount() {
    this.elementRef?.current?.addEventListener("mouseover", this.onHoverEnter, {
      passive: true,
    })
    this.elementRef?.current?.addEventListener("mouseout", this.onHoverOut, {
      passive: true,
    })
  }

  componentWillUnmount() {
    if (this.timeOut) clearTimeout(this.timeOut)

    this.elementRef?.current?.removeEventListener(
      "mouseover",
      this.onHoverEnter
    )
    this.elementRef?.current?.removeEventListener("mouseout", this.onHoverOut)
  }

  onHoverEnter(_: MouseEvent) {
    if (this.timeOut) clearTimeout(this.timeOut)

    this.setState({ currentClass: this.activeClass })
  }

  onHoverOut(_: MouseEvent) {
    this.timeOut = setTimeout(() => this.setState({ currentClass: "" }), 50)
  }

  render() {
    return this.props.render(this)
  }
}

export default ActiveOnHover
