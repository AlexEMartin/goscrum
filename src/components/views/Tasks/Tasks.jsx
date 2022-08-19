import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import debounce from "lodash.debounce";
import Header from "../../Header/Header";
import useResize from "../../../hooks/useResize";
import Card from "../../Card/Card";
import TaskForm from "../../TaskForm/TaskForm";
import { getTasks, deleteTask, editCardStatus } from "../../../store/actions/tasksActions";

const Tasks = () => {
  const { IsPhone } = useResize();
  const [renderList, setRenderList] = useState(null);
  const [list, setList] = useState(null);
  const [tasksfromWho, setTasksfromWho] = useState("ALL");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks(tasksfromWho === "ME" ? "/me" : ""));
  }, [tasksfromWho]);

  const { loading, error, tasks } = useSelector(state => {
      return state.tasksReducer
  })

  useEffect(() => {
    if(tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
    }
  }, [tasks])

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);

  if(error) return <div>Hay un error</div>

  const renderCardsData = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} editCardStatus={handleStatus} deleteCard={handleDelete} />);
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => <Card key={data._id} data={data} editCardStatus={handleStatus} deleteCard={handleDelete} />);
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
    }
  };

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const handleDelete = id => dispatch(deleteTask(id));

  const handleStatus = data => dispatch(editCardStatus(data));

  return (
    <>
      <div>
        <Header />
        <main className="flex flex-wrap" id="tasks">
          <TaskForm />
          <section className="lg:ml-52 md:ml-32 sm:ml-16">
            <div>
              <h2 className="font-bold ml-14 mt-12">MIS TAREAS</h2>
            </div>
            <div className="mt-6 ml-12">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  onChange={(event) =>
                    setTasksfromWho(event.currentTarget.value)
                  }
                >
                  <FormControlLabel
                    value="ALL"
                    control={<Radio />}
                    label="Todas"
                  />
                  <FormControlLabel
                    value="ME"
                    control={<Radio />}
                    label="Mis tareas"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <input
                type="text"
                placeholder="Buscar por título.."
                onChange={handleSearch}
                className="mt-4 mb-4 ml-12 border"
              />
            </div>
            <select
              name="importance"
              onChange={handleChangeImportance}
              className="ml-12 border"
            >
              <option value="">Prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            <div>
              {IsPhone ? (
                !renderList?.length ? (
                  <div className='ml-12 mt-6 text-red-400'>No hay tareas realizadas</div>
                ) : loading ? (
                  <div className='ml-12 mt-8'>
                    <Skeleton width={300} height={250} />
                    <Skeleton width={300} height={250} />
                    <Skeleton width={300} height={250} />
                  </div>
                ) : (
                  <>{renderCardsData()}</>
                )
              ) : (
                <>
                  {!renderList?.length ? (
                    <div>No hay tareas realizadas</div>
                  ) : loading ? (
                    <Skeleton />
                  ) : (
                    <div>
                      <h3 className="font-bold ml-14 mt-8">Nuevas</h3>
                      {renderColumnCards("NEW")}
                      <h3 className="font-bold ml-14 mt-8">En proceso</h3>
                      {renderColumnCards("IN PROGRESS")}
                      <h3 className="font-bold ml-14 mt-8">Finalizadas</h3>
                      {renderColumnCards("FINISHED")}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Tasks;
