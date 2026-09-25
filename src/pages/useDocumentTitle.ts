import { useEffect } from 'react'

const base = document.title

/** Sets the tab title for a page and restores the site title when it unmounts. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = base
    }
  }, [title])
}
