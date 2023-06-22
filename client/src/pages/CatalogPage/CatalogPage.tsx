import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import classes from "./CatalogPage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Popup from "../../components/Popup/Popup";
import TableButtonEdit from "../../components/TableButtonEdit/TableButtonEdit";
import TableButtonRemove from "../../components/TableButtonRemove/TableButtonRemove";
import {
  deleteMaterials,
  getMaterials,
  newMaterial,
  updateMaterial,
} from "../../redux/slices/materialsSlice";

const CatalogPage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const [classMat, setClassMat] = useState("");
  const [name, setName] = useState("");
  const [cash_price, setCashPrice] = useState("");
  const [card_price, setCardPrice] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { materials, loading, error } = useSelector(
    (state: RootState) => state.materials
  );

  const handleEditMaterial = (materialId) => {
    setSelectedOrderId(materialId);
    setIsModalActive(true);
  };

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  const addNewMaterial = async (e) => {
    e.preventDefault();
    const data = {
      class_material: classMat,
      name,
      cash_price,
      card_price,
    };
    dispatch(newMaterial(data));
    setIsModalActive(false);
  };

  const handleDeleteMaterial = (materialId) => {
    dispatch(deleteMaterials(materialId));
  };

  const handleUpdateMaterial = (e) => {
    e.preventDefault();
    const data = {
      class_material: classMat,
      name,
      cash_price,
      card_price,
    };

    dispatch(updateMaterial({ materialId: selectedOrderId, data }));

    setIsModalActive(false);
    setSelectedOrderId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID Товара",
      width: 150,
      flex: 0.1,
    },
    {
      field: "class_material",
      headerName: "Класс товара",
      width: 250,
      flex: 0.1,
    },
    {
      field: "name",
      headerName: "Товар",
      width: 150,
      flex: 0.1,
    },
    {
      field: "cash_price",
      headerName: "Цена нал.",
      width: 150,
      flex: 0.1,
    },
    {
      field: "card_price",
      headerName: "Цена карта",
      width: 150,
      flex: 0.1,
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: "flex" }}>
          <TableButtonEdit onClick={() => handleEditMaterial(params.row.id)} />
          <TableButtonRemove
            onClick={() => handleDeleteMaterial(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={classes.table}>
      <Popup
        popupTitle={selectedOrderId ? "Редактировать товар" : "Новый товар"}
        buttonText={selectedOrderId ? "Сохранить" : "Создать товар"}
        active={isModalActive}
        setActive={setIsModalActive}
        onClick={selectedOrderId ? handleUpdateMaterial : addNewMaterial}
      >
        <form className={classes.popupInputs} onSubmit={addNewMaterial}>
          <div className={classes.input}>
            <span className={classes.label}>Класс товара</span>
            <input
              type="text"
              placeholder="Класс товара"
              onChange={(e) => setClassMat(e.target.value)}
            />
            {error && error.class_material && (
              <span className={classes.error}>{error.class_material[0]}</span>
            )}
          </div>
          <div className={classes.input}>
            <span className={classes.label}>Название товара</span>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            {error && error.name && (
              <span className={classes.error}>{error.name[0]}</span>
            )}
          </div>
          <div className={classes.input}>
            <span className={classes.label}>Цена нал.</span>
            <input
              type="number"
              placeholder="Цена нал."
              onChange={(e) => setCashPrice(e.target.value)}
            />
            {error && error.cash_price && (
              <span className={classes.error}>{error.cash_price[0]}</span>
            )}
          </div>
          <div className={classes.input}>
            <span className={classes.label}>Цена нал.</span>
            <input
              type="number"
              placeholder="Цена карта"
              onChange={(e) => setCardPrice(e.target.value)}
            />
            {error && error.card_price && (
              <span className={classes.error}>{error.card_price[0]}</span>
            )}
          </div>
        </form>
      </Popup>

      <div className={classes.newOrder}>
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>Каталог</h1>
        </div>
        <div className={classes.buttonBlock}>
          <button
            onClick={() => {
              setIsModalActive(!isModalActive);
              setSelectedOrderId(null);
            }}
          >
            Новый товар
          </button>
        </div>
      </div>
      <DataGrid
        rows={materials}
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

export default CatalogPage;
