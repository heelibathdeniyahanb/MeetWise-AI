import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <h1 className="p-10 text-3xl">
        App Layout Works
      </h1>

      <Outlet />
    </div>
  );
};

export default AppLayout;