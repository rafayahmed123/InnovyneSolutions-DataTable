import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import "./DataTable.css"; // import the CSS

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

  const handleDelete = (rowIndex: number) => {
    const updated = data.filter((_, i) => i !== rowIndex);
    onDataChange(updated);
  };

  const columns = useMemo<ColumnDef<DataRow>[]>(() => {
    if (!data || data.length === 0) return [];

    const baseCols = Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
      cell: ({ row }: any) => {
        const value = row.original[key];
        const isEditing = editing?.row === row.index && editing?.key === key;

        return isEditing ? (
          <input
            className="new-row-input"
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

    const deleteCol: ColumnDef<DataRow> = {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }: any) => (
        <button
          className="btn btn-delete"
          onClick={() => handleDelete(row.index)}
        >
          Delete
        </button>
      ),
    };

    return [...baseCols, deleteCol];
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
      {/* New Row Input Table */}
      <table className="data-table">
        <thead>
          <tr>
            {Object.keys(newRow).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
          <tr>
            {Object.keys(newRow).map((key) => (
              <td key={key}>
                <input
                  className="new-row-input"
                  value={newRow[key]}
                  onChange={(e) =>
                    setNewRow({ ...newRow, [key]: e.target.value })
                  }
                />
              </td>
            ))}
          </tr>
        </thead>
      </table>

      <button className="btn btn-add" onClick={handleAddRow}>
        ➕ Add Row
      </button>

      {/* Data Table */}
      <table className="data-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <td key={cell.id}>
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
