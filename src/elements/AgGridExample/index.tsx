import * as React from 'react'
import { getAgGridStyle, styleFromTheme } from "../../themes"
import { DataSource, Matcher, SourceItem, defaultComparison, numberComparisons, stringComparisons } from 'multi-select-speech'
import MultiSelectSpeech from 'multi-select-speech'
import { AgGridReact } from "ag-grid-react";
import { fetchBondsAndCache } from '../../services/bondsService';
import Bond from '../../types/Bond';
import { ColDef, IRowNode } from 'ag-grid-community';
import { createFilter, getColumn } from '../../types/AgFilter';
import { useAppDispatch, useAppSelector } from '../../hooks/redxux';
import { extractDate, getSize, isSize, isUnique } from '../../utils';
import { setContext } from '../../store/contextSlice';
import './AgGridExample.css'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface AgGridExampleProps {
  showCategories?: boolean
  hideToolTips?: boolean
}


const AgGridExample: React.FC<AgGridExampleProps> = ({
  showCategories,
  hideToolTips
}) => {
  const agGridRef = React.useRef<AgGridReact<Bond> | null>(null)
  const [matchers, setMatchers] = React.useState<Matcher[]>()
  const [rowData, setRowData] = React.useState<Bond[]>();
  const [columnDefs] = React.useState<ColDef<Bond>[]>([
    { field: "isin", filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: "currency", filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: "issueDate", filter: 'agDateColumnFilter', sortable: true, resizable: true },
    { field: "maturityDate", filter: 'agDateColumnFilter', sortable: true, resizable: true },
    { field: "coupon", filter: 'agNumberColumnFilter', sortable: true, resizable: true },
    { field: "price", filter: 'agNumberColumnFilter', sortable: true, resizable: true },
    { field: "size", filter: 'agNumberColumnFilter', sortable: true, resizable: true },
    { field: "side", filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: "issuer", filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: "hairCut", filter: 'agNumberColumnFilter', sortable: true, resizable: true },
  ]);
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.theme)
  const context = useAppSelector((state) => state.context)

  const findItems = React.useCallback((text: string, field: 'isin' | 'currency' | 'issuer'): SourceItem[] => {
    const uniqueItems = new Set<string>()
    const callback = (row: IRowNode<Bond>) => {
      if (row.data) {
        const value = row.data[field];
        if (value &&
          value.toUpperCase().includes(text.toUpperCase())) {
          uniqueItems.add(value);
        }
      }
    }
    agGridRef.current?.api.forEachNodeAfterFilter(callback);
    let items = [...uniqueItems].sort();
    if (items.length > 10) {
      items = items?.slice(10)
    }
    return items
  }, [])

  const dataSource = React.useMemo<DataSource[]>(() => [
    {
      name: 'ISIN',
      title: 'ISIN Code',
      comparisons: defaultComparison,
      precedence: 3,
      ignoreCase: true,
      searchStartLength: 1,
      selectionLimit: 2,
      source: async (text) => new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(findItems(text, 'isin')
            ),
          5,
        )
      })
    },
    {
      name: 'Currency',
      title: 'Currency Code',
      comparisons: defaultComparison,
      precedence: 2,
      ignoreCase: true,
      selectionLimit: 2,
      source: async (text) => new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(findItems(text, 'currency')
            ),
          5,
        )
      })
    },
    {
      name: 'Coupon',
      title: 'Coupon',
      comparisons: numberComparisons,
      precedence: 1,
      selectionLimit: 2,
      match: (text: string) => !isNaN(Number(text)),
      value: (text: string) => Number.parseFloat(text),
    },
    {
      name: 'HairCut',
      title: 'Hair Cut',
      comparisons: numberComparisons,
      precedence: 1,
      selectionLimit: 2,
      match: (text: string) => !isNaN(Number(text)),
      value: (text: string) => Number.parseFloat(text),
    },
    {
      name: 'Price',
      title: 'Price',
      comparisons: numberComparisons,
      searchStartLength: 1,
      precedence: 1,
      selectionLimit: 2,
      match: (text: string) => !isNaN(Number(text)),
      value: (text: string) => Number.parseFloat(text),
    },
    {
      name: 'Size',
      title: 'Size',
      comparisons: numberComparisons,
      precedence: 4,
      searchStartLength: 1,
      selectionLimit: 2,
      match: (text: string) => isSize(text),
      value: (text: string) => getSize(text),
    },
    {
      name: 'Side',
      title: 'Side',
      comparisons: stringComparisons,
      precedence: 4,
      ignoreCase: true,
      selectionLimit: 2,
      source: ['BUY', 'SELL']
    },
    {
      name: 'Issuer',
      title: 'Issuer',
      comparisons: stringComparisons,
      precedence: 1,
      ignoreCase: true,
      selectionLimit: 2,
      match: /^[a-zA-Z ]{2,}$/,
      value: (text: string) => text,
    },
    {
      name: 'Issuer2',
      title: 'Issuer',
      comparisons: defaultComparison,
      precedence: 1,
      ignoreCase: false,
      searchStartLength: 3,
      selectionLimit: 2,
      source: async (text) => new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(findItems(text, 'issuer')
            ),
          5,
        )
      })
    },
    {
      name: 'MaturityDate',
      title: 'Maturity Date',
      comparisons: numberComparisons,
      precedence: 4,
      selectionLimit: 2,
      match: /^[0-9]{0,2}[yYmM]$/,
      value: (text: string) => extractDate(text),
    },
    {
      name: 'IssueDate',
      title: 'Issue Date',
      comparisons: numberComparisons,
      precedence: 3,
      selectionLimit: 2,
      match: /^[0-9]{0,2}[yYmM]$/,
      value: (text: string) => extractDate(text),
    },
  ],
    [findItems]
  )

  const matchersChanged = React.useCallback((newMatchers: Matcher[]) => {
    const sources = newMatchers.map(m => m.source).filter(isUnique)
    sources.forEach(source => {
      const column = getColumn(source)
      const values = newMatchers.filter(m => m.source === source)
      const filter = createFilter(values)
      const instance = agGridRef.current?.api?.getFilterInstance(column)
      if (instance) {
        instance?.setModel(filter)
      }
    })
    columnDefs.map(source => source.field).filter(field => field && !sources.find(src => getColumn(src) === field))
      .forEach(field => {
        if (field) {
          const instance = agGridRef.current?.api?.getFilterInstance(field)
          if (instance) {
            instance?.setModel(null)
          }
        }
      })
    agGridRef.current?.api?.onFilterChanged()
    setMatchers(newMatchers)
  }, [columnDefs])

  React.useEffect(() => {
    matchersChanged(context.matchers)
  }, [context, matchersChanged])

  React.useEffect(() => {
    fetchBondsAndCache()
      .then(setRowData)
      .catch(error => {
        if (typeof error === 'string') {
          console.log(error)
        } else if (error instanceof Error) {
          console.log(error.message)
          console.log(error.stack)
        } else {
          console.log(error.toString())
        }
      })
  }, [])



  return (
    <div>
      <div className='mainMultiselect'>
        <MultiSelectSpeech
          matchers={matchers}
          dataSources={dataSource}
          onMatchersChanged={m => dispatch(setContext(m))}
          styles={styleFromTheme(theme)}
          maxDropDownHeight={120}
          showCategories={showCategories}
          hideToolTip={hideToolTips}
        />
      </div>
      <div
        className="ag-theme-alpine agGrid"
        style={getAgGridStyle(theme)}
      >
        <AgGridReact
          ref={agGridRef}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>

  )
}

export default AgGridExample