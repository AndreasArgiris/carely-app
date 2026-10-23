import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppointmentsPage } from '@/features/appointments/AppointmentsPage';
import { ExamsPage } from '@/features/exams/ExamsPage';
import { JournalPage } from '@/features/journal/JournalPage';
import { MeasurementsPage } from '@/features/measurements/MeasurementsPage';
import { MedicationsPage } from '@/features/medications/MedicationsPage';
import { OverviewPage } from '@/features/overview/OverviewPage';
import { AppLayout } from './layout/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnWindowFocus: false } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="measurements" element={<MeasurementsPage />} />
            <Route path="medications" element={<MedicationsPage />} />
            <Route path="notes" element={<JournalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
