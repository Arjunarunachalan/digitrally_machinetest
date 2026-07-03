import { Link } from "react-router-dom";

function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((column) => (
              <th
                key={column.header}
                className="border p-2"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
    {data.length === 0 ? (
        <tr>
            <td
                colSpan={columns.length}
                className="border p-4 text-center"
            >
                No Data Found.
            </td>
        </tr>
    ) : (
        data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
                {columns.map((column) => (
                    <td
                        key={column.header}
                        className="border p-2"
                    >
                        {column.cell
                            ? column.cell(row)
                            : row[column.accessorKey]}
                    </td>
                ))}
            </tr>
        ))
    )}
</tbody>
      </table>
    </div>
  );
}

export default Table;
