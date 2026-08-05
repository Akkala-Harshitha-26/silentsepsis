import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

export default function Layout() {
  return (
    <div className="shell-top">
      <TopNav />
      <main className="main-top">
        <Outlet />
      </main>
    </div>
  );
}
