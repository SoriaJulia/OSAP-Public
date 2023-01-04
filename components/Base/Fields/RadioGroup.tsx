import React, {
  FieldsetHTMLAttributes,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const RadioGroupContext = React.createContext<{ changeHandler: (value: string) => void; selected: string } | null>(
  null
);
export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('Must accesss context from within provider');
  return context;
};

type RadioGroupProps = {
  children: ReactNode;
  stateSetter: React.Dispatch<SetStateAction<any>>;
  legend: string;
  defaultValue: string;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;

const RadioGroup = ({ children, stateSetter, defaultValue, legend, className, ...props }: RadioGroupProps) => {
  const [selected, setSelected] = useState(defaultValue);

  const changeHandler = useCallback(
    (value: string) => {
      stateSetter(value);
      setSelected(value);
    },
    [stateSetter]
  );
  const contextValue = useMemo(() => ({ selected, changeHandler }), [changeHandler, selected]);
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset
        className={`${className} mb-3 flex flex-wrap gap-10 rounded-sm border-2 p-4 px-10 text-left`}
        {...props}
      >
        <legend className="text-xl">{legend}</legend>
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
