import { useEffect, useState } from "react";
import Popup from "../../components/Popup/Popup";
import TableButtonEdit from "../../components/TableButtonEdit/TableButtonEdit";
import TableButtonRemove from "../../components/TableButtonRemove/TableButtonRemove";
import classes from "./OrderPage.module.css";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  deleteOrder,
  getOrders,
  newOrder,
  updateOrder,
} from "../../redux/slices/ordersSlice";

const OrdersPage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [recyclables, setRecyclables] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const addNewOrder = async (e) => {
    e.preventDefault();
    const data = {
      phone,
      orderDate,
      recyclables,
    };
    dispatch(newOrder(data));
    setIsModalActive(false);
  };

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    const data = {
      phone,
      orderDate,
      recyclables,
    };

    dispatch(updateOrder({ orderId: selectedOrderId, data }));

    setIsModalActive(false);
    setSelectedOrderId(null);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleEditOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalActive(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID Заявки",
      width: 150,
      flex: 0.1,
    },
    {
      field: "orderDate",
      headerName: "Дата заявки",
      width: 250,
      flex: 0.1,
    },
    {
      field: "phone",
      headerName: "Номер телефона",
      width: 150,
      flex: 0.1,
    },
    {
      field: "recyclables",
      headerName: "Сырье",
      width: 150,
      flex: 0.1,
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: "flex" }}>
          <TableButtonEdit onClick={() => handleEditOrder(params.row.id)} />
          <TableButtonRemove onClick={() => handleDeleteOrder(params.row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className={classes.table}>
      <Popup
        popupTitle={selectedOrderId ? "Редактировать заявку" : "Новая заявка"}
        buttonText={selectedOrderId ? "Сохранить" : "Оформить заявку"}
        active={isModalActive}
        setActive={setIsModalActive}
        onClick={selectedOrderId ? handleUpdateOrder : addNewOrder}
      >
        <form className={classes.popupInputs} onSubmit={addNewOrder}>
          <div className={classes.input}>
            <span className={classes.label}>Номер телефона</span>
            <input
              type="tel"
              placeholder="Номер телефона"
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && error.phone && (
              <span className={classes.error}>{error.phone[0]}</span>
            )}
          </div>
          <div className={classes.input}>
            <span className={classes.label}>Дата заявки</span>
            <input
              type="date"
              style={{ width: "165px" }}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            {error && error.orderDate && (
              <span className={classes.error}>{error.orderDate[0]}</span>
            )}
          </div>
          <div className={classes.input}>
            <span className={classes.label}>Сырье</span>
            <input
              type="text"
              placeholder="Сырье"
              onChange={(e) => setRecyclables(e.target.value)}
            />
            {error && error.recyclables && (
              <span className={classes.error}>{error.recyclables[0]}</span>
            )}
          </div>
        </form>
      </Popup>

      <div className={classes.newOrder}>
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>Заявки</h1>
        </div>
        <div className={classes.buttonBlock}>
          <button
            onClick={() => {
              setIsModalActive(!isModalActive);
              setSelectedOrderId(null);
            }}
          >
            Новая заявка
          </button>
        </div>
      </div>
      <DataGrid
        rows={orders}
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

export default OrdersPage;
