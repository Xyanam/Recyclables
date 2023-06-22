import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import classes from "./PriemPage.module.css";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getMaterials } from "../../redux/slices/materialsSlice";
import { useSelector } from "react-redux";
import TableButtonRemove from "../../components/TableButtonRemove/TableButtonRemove";
import TableButtonEdit from "../../components/TableButtonEdit/TableButtonEdit";
import Popup from "../../components/Popup/Popup";
import { getOrders } from "../../redux/slices/ordersSlice";
import {
  addNewReception,
  deleteReception,
  getReception,
} from "../../redux/slices/receptionSlice";

const PriemPage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState("1");
  const [impurity, setImpurity] = useState("");
  const [weightStart, setWeightStart] = useState("");
  const [weightEnd, setWeightEnd] = useState("");

  const [materialsState, setMaterials] = useState([]);

  const addMaterial = () => {
    const newMaterial = { id: materialsState.length + 1, name: "" };
    setMaterials([...materialsState, newMaterial]);
  };

  const handleMaterialChange = (event, index) => {
    const updatedMaterials = materialsState.map((material, idx) => {
      if (idx === index) {
        return event.target.value;
      }
      return material;
    });
    setMaterials(updatedMaterials);
  };

  const handleDeleteReception = (receptionId) => {
    dispatch(deleteReception(receptionId));
  };

  const { materials, loading, error } = useSelector(
    (state: RootState) => state.materials
  );

  const { orders } = useSelector((state: RootState) => state.orders);

  const { reception } = useSelector((state: RootState) => state.reception);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID Заказа",
      width: 150,
      flex: 0.1,
    },
    {
      field: "order_id",
      headerName: "ID заявки",
      width: 250,
      flex: 0.1,
    },
    {
      field: "weightStart",
      headerName: "Вес старт",
      width: 150,
      flex: 0.1,
    },
    {
      field: "weightEnd",
      headerName: "Вес финиш",
      width: 150,
      flex: 0.1,
    },
    {
      field: "materials",
      headerName: "Материалы",
      width: 150,
      flex: 0.1,
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: "flex" }}>
          <TableButtonEdit />
          <TableButtonRemove
            onClick={() => handleDeleteReception(params.row.id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getReception());
    dispatch(getMaterials());
    dispatch(getOrders());
  }, [dispatch]);

  const handleSubmit = () => {
    const data = {
      order_id: orderId,
      Impurity: impurity,
      weightStart,
      weightEnd,
      totalWeight: weightStart - weightEnd,
      materials: materialsState,
    };
    dispatch(addNewReception(data));
  };

  return (
    <div className={classes.table}>
      <Popup
        popupTitle={selectedOrderId ? "Редактировать заявку" : "Новый заказ"}
        buttonText={selectedOrderId ? "Сохранить" : "Оформить заказ"}
        active={isModalActive}
        setActive={setIsModalActive}
        onClick={handleSubmit}
      >
        <form className={classes.popupInputs}>
          <div className={classes.input}>
            <span className={classes.label}>Номер заявки</span>
            <select
              className={classes.select}
              onChange={(e) => setOrderId(e.target.value)}
            >
              {orders.map((order) => (
                <option key={order.id}>{order.id}</option>
              ))}
            </select>
          </div>
          <div className={classes.weightBlock}>
            <input
              type="number"
              placeholder="Вес старт"
              value={weightStart}
              onChange={(e) => setWeightStart(e.target.value)}
              className={classes.weight}
            />
            <input
              type="number"
              placeholder="Вес финиш"
              className={classes.weight}
              value={weightEnd}
              onChange={(e) => setWeightEnd(e.target.value)}
            />
          </div>
          {weightStart && weightEnd && (
            <div>
              <span>Масса = {weightStart - weightEnd}</span>
            </div>
          )}
          <div className={classes.input}>
            <span className={classes.label}>Засор %</span>
            <input
              type="number"
              placeholder="Засор"
              value={impurity}
              onChange={(e) => setImpurity(e.target.value)}
            />
          </div>
          <div>
            {materialsState.map((material, index) => (
              <div key={index} className={classes.input}>
                {" "}
                <span className={classes.label}>Материал {index + 1}</span>
                <select
                  className={classes.select}
                  value={material.id}
                  onChange={(event) => handleMaterialChange(event, index)}
                >
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <p onClick={addMaterial} style={{ cursor: "pointer" }}>
              Добавить материал
            </p>
          </div>
        </form>
      </Popup>
      <div className={classes.newOrder}>
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>Заказы</h1>
        </div>
        <div className={classes.buttonBlock}>
          <button
            onClick={() => {
              setIsModalActive(!isModalActive);
              setSelectedOrderId(null);
            }}
          >
            Создать заказ
          </button>
        </div>
      </div>
      <DataGrid
        rows={reception}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 100]}
        sx={{
          background: "white",
          border: "none",
        }}
      />
    </div>
  );
};

export default PriemPage;
