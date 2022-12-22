import React from 'react';

const FieldLabel = ({ htmlFor, text, required }: { htmlFor: string; text: string; required?: boolean }) => {
  return (
    <label className="text-left text-xl text-blue-700" htmlFor={htmlFor}>
      {text}
      {required && (
        <span title="Requerido" className="cursor-help">
          {' '}
          *
        </span>
      )}
    </label>
  );
};

export default FieldLabel;
