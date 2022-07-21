import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import swal from "../../../../utils/Swal";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad mínima de caracteres es 4")
        .required(required),
      password: Yup.string().required(required),
    });

  const onSubmit = () => {
    const { userName, password } = values;

    fetch("https://goscrum-api.alkemy.org/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    formik;

  return (
    <div>
      <form
        className="w-96 mx-auto mt-16 bg-indigo-900 flex flex-col flex-wrap items-center justify-center text-slate-50 rounded-2xl shadow-2xl shadow-gray-900"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mt-4">Iniciar Sesión</h1>
        <div className="mt-4">
          <label className="font-bold mt-6 ml-6" htmlFor="userName">
            Nombre de usuario
          </label>
          <input
            className="w-80 mx-6 mt-6 mb-2 p-0.5 text-black indent-4 border border-current border-solid my-2 rounded-full"
            type="text"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.userName}
          />
          {errors.userName && touched.userName && (
            <div className="mx-6 text-red-500">{errors.userName}</div>
          )}
        </div>
        <div className="mt-12">
          <label className="font-bold mt-2 ml-6" htmlFor="password">
            Password
          </label>
          <input
            className="w-80 mx-6 mb-2 p-0.5 text-black indent-4 border border-current border-solid my-2 rounded-full"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.password}
          />
          {errors.password && touched.password && (
            <div className="mx-6 mb-6 text-red-500">{errors.password}</div>
          )}
        </div>
        <div>
          <button
            className="w-32 p-2 mt-4 mb-4 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 font-bold shadow-indigo-50"
            type="submit"
          >
            Enviar
          </button>
          <div className="m-auto p-4">
            <Link to="/register">Registrarme</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
