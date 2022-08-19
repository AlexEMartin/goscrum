import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://goscrum-api.alkemy.org/auth/data")
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, [data]);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad mínima de caracteres es 4")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Debe ser un email válido").required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch("https://goscrum-api.alkemy.org/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, {
          replace: true,
        })
      );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  return (
    <div>
      <form
        className="w-96 mx-auto mt-28 bg-indigo-900 flex flex-col flex-wrap items-center justify-center text-slate-50 rounded-2xl shadow-2xl shadow-gray-900"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mt-4 mb-4">Registro</h1>
        <div>
          <label className="font-bold mt-6 ml-6" htmlFor="email">
            Nombre de usuario
          </label>
          <input
            className="w-80 mx-6 p-0.5 text-black indent-4 border border-current border-solid my-2 rounded-full"
            type="text"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
          />
          {errors.userName && touched.userName && (
            <span className="text-red-500 mx-6 text-sm">{errors.userName}</span>
          )}
        </div>
        <div className="mt-2">
          <label className="font-bold mt-6 ml-6" htmlFor="password">
            Password
          </label>
          <input
            className="w-80 mx-6 p-0.5 text-black indent-4 border border-current border-solid my-2 rounded-full"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && (
            <span className="text-red-500 mx-6 text-sm">{errors.password}</span>
          )}
        </div>
        <div>
          <label className="flex-col font-bold mt-6 ml-6" htmlFor="email">
            Email
          </label>
          <input
            className="w-80 mx-6 p-0.5 text-black indent-4 border border-current border-solid my-2 rounded-full"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 mx-6 text-sm">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
            />
          }
          label="Pertenecés a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label className="ml-6 mt-4">
              Por favor, introduce el identificador de equipo
            </label>
            <input
              className="w-80 mx-6 p-0.5 border text-black indent-4 border-current border-solid my-2 rounded-full"
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="ml-8">
          <div>
            <label htmlFor="role" className="font-bold pr-1 mr-16">
              Rol
            </label>
            <select
              className="w-40 mb-2 border text-black border-current border-solid my-2 rounded"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
            >
              <option value="">Elegir</option>
              {data?.Rol?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.role && touched.role && (
            <span className="text-red-500 text-sm mb-2">{errors.role}</span>
          )}
          <div>
            <label className="font-bold mr-4">Continente</label>
            <select
              name="continent"
              onChange={(event) =>
                handleChangeContinent(event.currentTarget.value)
              }
              value={values.continent}
              onBlur={handleBlur}
              className="w-40 mb-2 border text-black border-current border-solid my-2 rounded"
            >
              <option value="">Continente</option>
              {data?.continente?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.continent && touched.continent && (
            <span className="text-red-500 text-sm mb-2">
              {errors.continent}
            </span>
          )}
          {values.continent === "America" && (
            <>
              <div>
                <label className="font-bold pr-1 mr-10">Región</label>
                <select
                  name="region"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.region}
                  className="w-40 mb-2 border text-black border-current border-solid my-2 rounded"
                >
                  <option value="">Región</option>
                  {data?.region?.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {errors.region && touched.region && (
                <span className="text-red-500 text-sm mb-2">
                  {errors.region}
                </span>
              )}
            </>
          )}
          <div className="ml-12 mt-4">
            <button
              className="w-32 p-2 mt-2 mb-2 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 font-bold shadow-indigo-50"
              type="submit"
            >
              Enviar
            </button>
            <div className="m-auto p-4">
              <Link to="/login">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
