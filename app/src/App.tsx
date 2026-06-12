import { Route, Routes } from 'react-router'
import { Suspense, useState, lazy } from 'react'
import PageTransitionOverlay from '@/components/PageTransitionOverlay'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ItineraryPage = lazy(() => import('@/pages/ItineraryPage'))

export default function App() {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)

  const handleItineraryNavigation = () => {
    setIsPageTransitioning(true)
    window.setTimeout(() => setIsPageTransitioning(false), 480)
  }

  return (
    <>
      <PageTransitionOverlay visible={isPageTransitioning} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage onNavigateItinerary={handleItineraryNavigation} />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
