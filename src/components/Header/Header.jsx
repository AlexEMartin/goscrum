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
    navigate("/login", { replace: true });
  };

  return (
    <header className="shadow-md bg-blue-600 h-32 flex justify-between px-4 py-2">
      <div className="w-full flex items-center justify-between">
        <img className="h-20" src={logo} alt="logo" />
        <div className="flex">
          <div className="mr-8 mt-4">
            <button
              className="hover:bg-blue-400 text-white font-bold rounded p-2"
              onClick={() => navigate("/donate", { replace: true })}
            >
              Donar
            </button>
          </div>
          <div></div>
          <div className="font-bold text-white mt-6 pr-6">
            Tareas creadas: {tasks?.length}
          </div>
          <span className="pr-6 mt-6 ml-4 font-bold text-white">
            {localStorage.getItem("userName")}
          </span>
          <div onClick={handleLogout} className="cursor-pointer mx-4 mt-6 text-white hover:text-2xl hover:mt-5 hover:ml-3 transition-all duration-300 ease">
            x
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
