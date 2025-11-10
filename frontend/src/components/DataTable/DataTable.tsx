import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

interface DataRow {
  [key: string]: any;
}

interface DataTableProps {
  data: DataRow[];
  onDataChange: (updated: DataRow[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDataChange }) => {
  const [editing, setEditing] = useState<{ row: number; key: string } | null>(
    null
  );
  const [newRow, setNewRow] = useState<DataRow>(() => {
    const row: DataRow = {};
    Object.keys(data?.[0] ?? {}).forEach((k) => (row[k] = ""));
    return row;
  });

  const handleBlur = () => setEditing(null);

  const columns = useMemo<ColumnDef<DataRow>[]>(() => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
      cell: ({ row }) => {
        const value = row.original[key];
        const isEditing = editing?.row === row.index && editing?.key === key;

        return isEditing ? (
          <input
            value={value}
            autoFocus
            onChange={(e) => {
              const updated = [...data];
              updated[row.index] = {
                ...updated[row.index],
                [key]: e.target.value,
              };
              onDataChange(updated);
            }}
            onBlur={handleBlur}
            style={{ width: "100%" }}
          />
        ) : (
          <span
            onClick={() => setEditing({ row: row.index, key })}
            style={{ cursor: "pointer" }}
          >
            {value}
          </span>
        );
      },
    }));
  }, [data, editing, onDataChange]);

  const handleAddRow = () => {
    onDataChange([...data, newRow]);
    const reset: DataRow = {};
    Object.keys(newRow).forEach((k) => (reset[k] = ""));
    setNewRow(reset);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table
        style={{
          border: "1px solid black",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <thead>
          <tr>
            {Object.keys(newRow).map((key) => (
              <th
                key={key}
                style={{ border: "1px solid black", padding: "0.5rem" }}
              >
                {key}
              </th>
            ))}
          </tr>
          <tr>
            {Object.keys(newRow).map((key) => (
              <td
                key={key}
                style={{ border: "1px solid black", padding: "0.5rem" }}
              >
                <input
                  value={newRow[key]}
                  onChange={(e) =>
                    setNewRow({ ...newRow, [key]: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </td>
            ))}
          </tr>
        </thead>
      </table>

      <button
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#00b37e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={handleAddRow}
      >
        ➕ Add Row
      </button>

      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ border: "1px solid black", padding: "0.5rem" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ border: "1px solid black", padding: "0.5rem" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
