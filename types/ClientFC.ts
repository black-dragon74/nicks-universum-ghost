import { NextPage } from "next"

export type ClientFC<T> = NextPage<T> & {
  clientOnly?: boolean
}
