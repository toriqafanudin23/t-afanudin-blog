import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { QUADRATIC_POST_SLUG } from '@/data/posts'
import { routes } from '@/lib/routes'
import Home from '@/pages/Home'

// Halaman selain beranda dimuat saat dibutuhkan (code splitting per rute).
const Post = lazy(() => import('@/pages/Post'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.post(QUADRATIC_POST_SLUG)} element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
