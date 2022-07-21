import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    fetch("https://goscrum-api.alkemy.org/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ task: values }),
    })
      .then((response) => response.json())
      .then((data) => {
        resetForm();
        toast("Tu tarea se creó !");
      });
  };

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "* At least 6 characters long  😡")
        .required("* Please enter your task  😋"),
      status: Yup.string().required("* Pick status."),
      importance: Yup.string().required("* Pick importance."),
      description: Yup.string().required("* Write some description."),
    });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <section className="task-form">
      <div className="w-72 ml-8 mt-12">
        <h2 className="mb-6 font-bold">Crear Tarea</h2>
        <form
          className="flex flex-column flex-wrap ml-4"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mt-4">
              <input
                type="text"
                name="title"
                placeholder="Título"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.title ? "error" : ""}
                value={values.title}
              />
            </div>
            {errors.title && touched.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
            <div className="mt-4">
              <select
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.status ? "error" : ""}
                value={values.status}
              >
                <option value="">Seleccionar</option>
                <option value="NEW">New</option>
                <option value="IN PROGRESS">InProgress</option>
                <option value="FINISHED">Finished</option>
              </select>
            </div>
            {errors.status && touched.status && (
              <span className="text-red-500 text-sm">{errors.status}</span>
            )}
            <div className="mt-4">
              <select
                name="importance"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.importance ? "error" : ""}
                value={values.importance}
              >
                <option value="">Seleccionar</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            {errors.importance && touched.importance && (
              <span className="text-red-500 text-sm">{errors.importance}</span>
            )}
          </div>
          <div className="my-4">
            <textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Descripción"
              cols="40"
              rows="6"
              className={errors.description ? "error" : ""}
              value={values.description}
            ></textarea>
            {errors.description && touched.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>
          <button
            className="bg-red-500 p-2 text-white font-bold text-sm rounded-md"
            type="submit"
          >
            Crear
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default TaskForm;
