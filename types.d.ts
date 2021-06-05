// Types for CSS modules
declare module "*.scss" {
  const styles: { [className: string]: string } = []
  export default styles
}

// Custom types for lib `hast-util-to-string`
declare module "hast-util-to-string" {
  import { Node } from "unist"
  export default function toString(node: Node): string
}
