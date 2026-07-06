import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

// Защита панели: без действующей сессии — редирект на форму входа.
export default async function DashboardGuard({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin');
  return <>{children}</>;
}
