import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tableDark, setTableDark] = useState("");

  const getData = () => {
    axios
      .get("https://6649e56c4032b1331bef27bc.mockapi.io/api/create/crud")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://6649e56c4032b1331bef27bc.mockapi.io/api/create/crud/${id}`
      )
      .then(() => {
        getData();
      });
  };

  //read data in argument
  const setToLocalStorage = (id, name, email) => {
    //local staroge = store in key-value pair
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          onClick={() => {
            if (tableDark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation </h2>
        <Link to="/">
          <button type="button" className="btn btn-secondary">
            Create
          </button>
        </Link>
      </div>
      <table className={`table ${tableDark}`}>
        <thead className="p-3 mb-2 bg-success text-white">
          <tr key="id">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {data.map((item) => {
          return (
            <>
              <tbody>
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {/* when edit button clicked, store the data in local storage */}
                    <Link to="/update">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          setToLocalStorage(item.id, item.name, item.email)
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Read;
