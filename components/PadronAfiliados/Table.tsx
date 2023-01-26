import { Afiliado } from '@appTypes/afiliado';
import Button from '@components/Base/Button';
import { capitalizeText, getAge } from '@lib/utils';
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { find } from 'lodash';
import { List, CaretDoubleUp, CaretDoubleDown, IdentificationCard } from 'phosphor-react';
import React, { Fragment } from 'react';
import CardAfiliado from './Details';

const renderSubComponent = (afiliado: Afiliado | undefined) => {
  if (afiliado) return <CardAfiliado afiliado={afiliado} />;
};

const columns: ColumnDef<Afiliado, string>[] = [
  { accessorKey: 'Numero', header: 'Número' },
  { accessorKey: 'Afiliado', header: 'Nombre y Apellido', cell: (info) => capitalizeText(info.getValue()) },
  { accessorKey: 'fechanac', header: 'Edad', cell: (info) => getAge(info.getValue()) },
  { accessorKey: 'Documento', cell: (info) => (info.getValue() as unknown as number).toLocaleString('es') },
  { accessorKey: 'Estado' },
  {
    id: 'actions',
    columns: [
      {
        id: 'expander',
        cell: ({ row }) => {
          return (
            <Button
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
              label="Ver"
              variant="yellowFill"
              leadingIcon={<IdentificationCard size={22} />}
            />
          );
        },
      },
    ],
  },
];
function Table({ data }: { data: Afiliado[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const getRowCanExpand = () => true;
  const table = useReactTable<Afiliado>({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getRowCanExpand,
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="table-head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  {...{
                    className: header.column.getCanSort() ? 'table-th-sortable' : '',
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {header.isPlaceholder || !header.column.getCanSort() ? null : (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <>
                      {!header.column.getIsSorted() && <List className="table-sorting-icon" />}
                      {header.column.getIsSorted() === 'asc' && <CaretDoubleUp className="table-sorting-icon" />}
                      {header.column.getIsSorted() === 'desc' && <CaretDoubleDown className="table-sorting-icon" />}
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body">
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr>
                {/* first row is a normal row */}
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
              {row.getIsExpanded() &&
                renderSubComponent(find(data, (afiliado) => afiliado.Numero === row.getValue('Numero')))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
