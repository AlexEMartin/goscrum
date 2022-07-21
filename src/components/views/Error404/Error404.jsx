import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 4000);

  return (
    <div className="w-3/12 mx-auto my-20 bg-slate-50 tracking-wider font-bold text-center p-20 shadow-2xl shadow-red-500 rounded-lg">
      <div>Error 404</div>
      <p>Page Not Found</p>
    </div>
  );
};

export default Error404;
