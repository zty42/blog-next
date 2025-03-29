import { DetailedHTMLProps, HTMLAttributes } from "react";

const components = {
  h1: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    <h1 {...props} className="text-2xl font-extrabold tracking-tight my-6">
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
    <ul {...props} className="ml-4 list-disc">
      {props.children}
    </ul>
  ),
  li: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
  ) => (
    <li {...props} className="ml-4">
      {props.children}
    </li>
  ),
  blockquote: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  ) => (
    <blockquote className="py-4 px-2 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
      {props.children}
    </blockquote>
  ),
  pre: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
  ) => (
    <pre {...props} className="overflow-x-auto rounded-lg my-4">
      {props.children}
    </pre>
  ),
  code: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  ) => (
    <code {...props} className="px-6 py-4">
      {props.children}
    </code>
  ),
};

export default components;
