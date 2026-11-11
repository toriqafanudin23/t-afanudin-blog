import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { LOMBA_2021_POST_SLUG, QUADRATIC_POST_SLUG, SIMULASI_POST_SLUG } from '@/data/posts'
import { routes } from '@/lib/routes'
import Home from '@/pages/Home'

// Halaman selain beranda dimuat saat dibutuhkan (code splitting per rute).
const Post = lazy(() => import('@/pages/Post'))
const Lomba2021Post = lazy(() => import('@/pages/posts/Lomba2021Post'))
const SimulasiPost = lazy(() => import('@/pages/posts/SimulasiPost'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.post(QUADRATIC_POST_SLUG)} element={<Post />} />
          <Route path={routes.post(LOMBA_2021_POST_SLUG)} element={<Lomba2021Post />} />
          <Route path={routes.post(SIMULASI_POST_SLUG)} element={<SimulasiPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
