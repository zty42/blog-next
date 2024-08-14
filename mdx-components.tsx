import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: (props) => <pre {...props} className="bg-gray-100 p-4 rounded-md" />,
  }
}
