import { Component, ComponentType, createRef, RefObject } from "react"

// this file exists just for my personal reference
// this is a HOC impl of ActiveOnHover which is render prop based

interface WrappedComponentProps {}

// Hoc return one additional property, i.e. forwardedRef
const withActiveOnHover = <
  OriginalComponentProps extends WrappedComponentProps
>(
  OriginalComponent: ComponentType<
    OriginalComponentProps & WrappedComponentProps
  >
) => {
  class WrappedComponent extends Component<
    OriginalComponentProps & WrappedComponentProps
  > {
    refToForward: RefObject<HTMLDivElement>

    constructor(props: WrappedComponentProps & OriginalComponentProps) {
      super(props)

      this.refToForward = createRef()
    }

    componentDidMount() {
      this.refToForward?.current?.addEventListener("mouseover", () =>
        console.log("Ah yes over over")
      )
    }

    render() {
      return (
        <OriginalComponent {...this.props} forwardedRef={this.refToForward} />
      )
    }
  }

  return WrappedComponent
}
