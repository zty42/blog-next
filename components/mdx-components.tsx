import { DetailedHTMLProps, HTMLAttributes } from "react";

const components = {
  h1: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h1 {...props} className="text-2xl font-extrabold tracking-tight mt-6">
      {props.children}
    </h1>
  ),
  h2: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h2 {...props} className="text-xl font-extrabold tracking-tight mt-6">
      {props.children}
    </h2>
  ),
  h3: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h3 {...props} className="text-lg font-semibold tracking-tight mt-4">
      {props.children}
    </h3>
  ),
  h4: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h4 {...props} className="text-lg font-semibold tracking-tight mt-4">
      {props.children}
    </h4>
  ),
  p: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >
  ) => (
    <p {...props} className="leading-7 [&:not(:first-child)]:mt-4">
      {props.children}
    </p>
  ),
  ul: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
  ) => (
    <ul {...props} className="my-4 ml-4 list-disc [&>li]:mt-2">
      {props.children}
    </ul>
  ),
};

export default components;
