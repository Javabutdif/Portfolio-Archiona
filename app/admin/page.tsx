import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { AdminDashboard } from './_dashboard';

export default async function AdminPage() {
  const admin = await isAdmin();
  if (!admin) redirect('/admin/login');
  return <AdminDashboard />;
}
