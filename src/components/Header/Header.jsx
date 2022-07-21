import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header className="shadow-md bg-slate-100 h-20 flex justify-between px-4 py-2">
      <img src={logo} alt="logo" />
      <div className="flex">
        <div className="mr-8 mt-4">
          <button
            className="bg-indigo-400 text-white font-bold rounded p-2"
            onClick={() => navigate("/donate", { replace: true })}
          >
            Donar
          </button>
        </div>
        <div></div>
        <div className="font-bold mt-6 pr-6">
          Tareas creadas: {tasks?.length}
        </div>
        <span className="pr-6 mt-6 font-bold">
          {localStorage.getItem("userName")}
        </span>
        <div onClick={handleLogout} className="cursor-pointer mt-6">
          x
        </div>
      </div>
    </header>
  );
};

export default Header;
