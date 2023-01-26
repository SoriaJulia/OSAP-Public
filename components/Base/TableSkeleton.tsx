import React from 'react';

const TableSkeleton = ({ headers }: { headers: string[] }) => {
  return (
    <table className="table-loading table">
      <thead>
        <tr className="table-head">
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        <tr>
          {headers.map((header) => (
            <td key={header} />
          ))}
        </tr>
        <tr>
          {headers.map((header) => (
            <td key={header} />
          ))}
        </tr>
        <tr>
          {headers.map((header) => (
            <td key={header} />
          ))}
        </tr>
        <tr>
          {headers.map((header) => (
            <td key={header} />
          ))}
        </tr>
        <tr>
          {headers.map((header) => (
            <td key={header} />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default TableSkeleton;
