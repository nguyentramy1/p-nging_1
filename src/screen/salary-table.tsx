import React, { useState, useEffect, useRef } from "react";
import "./salary-table.scss";
import Button_p from "../common/Button/Button-plus.tsx";
import DropDownField, {
  optionType,
} from "../common/DropDown/DropDownField.tsx";
import Table from "../common/table/table.tsx";
import Input from "../common/Input/Input-lop.tsx";

import Pagination from "../common/pagination/pagination.tsx";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { appActions } from "../redux/appSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  const selected1 = useAppSelector((state) => state.app.selected1);
  const inputValue = useAppSelector((state) => state.app.inputValue);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const dt = new Array(80).fill(null);
  const data = dt.map((_, index) => ({
    tenBL: `Bảng lương số ${index}`,
    Kyluong: `Kỳ lương số ${index}`,
  }));

  const handleTenBLClick = (stt: number) => {
    console.log(stt); // In ra STT
  };

  const columnNames = {
    tenBL: {
      label: "Tên bảng lương",
      render: (label: string, index: number) => (
        <span
          style={{
            color: "#009AE3",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => handleTenBLClick(index + 1)}
        >
          {label}
        </span>
      ),
    },
    Kyluong: {
      label: "Kỳ lương",
      render: (label: string) => (
        <span
          style={{
            color: "#001F2D",
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {label}
        </span>
      ),
    },
  };

  const uniqueSalaries = [
    { value: "all", label: "Tất cả" },
    ...Array.from(new Set(data.map((item) => item.Kyluong))).map((salary) => ({
      value: salary.toString(),
      label: salary,
    })),
  ];

  const filteredData = data.filter((item) => {
    const matchesName = item.tenBL
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const matchesSalary =
      selected1 === null ||
      selected1.value === "all" ||
      item.Kyluong.toString() === selected1.value;
    return matchesName && matchesSalary;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (tableContainerRef.current) {
      const containerHeight = tableContainerRef.current.clientHeight;
      const rowHeight = 37.6;
      const calculatedItemsPerPage = Math.floor(containerHeight / rowHeight);
      setItemsPerPage(calculatedItemsPerPage || 5);
    }
  }, [tableContainerRef.current]);

  useEffect(() => {
    setCurrentPage(1);
  }, [inputValue, selected1]);

  return (
    <>
      <header>
        <div className="head-container">
          <div className="logo"></div>
          <div className="name"></div>
        </div>
      </header>
      <body>
        <div className="Fillter">
          <div className="sub-fillter">
            <Input
              value={inputValue}
              onChange={(value) => dispatch(appActions.setInputValue(value))}
              placeholder="Nhập tên nhân viên"
            />
            <DropDownField
              options={uniqueSalaries}
              onChange={(option) => dispatch(appActions.setSelected1(option))}
              selected={selected1?.label}
              placeholder="Lọc theo mức lương"
            />
          </div>

          <Button_p onClick={console.log} style={{ width: "10px" }} />
        </div>
        <div ref={tableContainerRef} style={{ marginBottom: "20px" }}>
          <Table data={currentData} columnNames={columnNames} />
        </div>
        <Pagination
          totalData={filteredData.length}
          pagNumber={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </body>
    </>
  );
}

export default App;
