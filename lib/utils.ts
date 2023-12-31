import { InputChangeHandler, TextAreaChangeHandler } from '@appTypes/reactCommon';
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';
import _ from 'lodash';
import { GECROSBaseResponse, ServiceResponse } from '@appTypes/gecros';
import { QueryObserverOptions } from '@tanstack/react-query';
import { DEFAULT_CACHE_TIME, DEFAULT_STALE_TIME } from './constants';

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });
}

export type ParseSOAPOptions = {
  actionName: string;
  resultName: string;
  rootResultName?: string;
  parserOptions?: X2jOptionsOptional;
};

/**
 * @description Parses GECROS service from SOAP/XML format to JSON.
 * @param {string} xml xml text with service response. It contains another XML string with the actual data.
 * @param {ParseSOAPOptions} options
 * @param {string} options.actionName - Required.
 * XML response always contains actionName + Response, and actionName + Result
 * @param {string} options.rootResultName - Optional. Most responses use DocumentElement as the rootResultName
 * @param {string} options.resultName - Optional.
 * Index on service response object which contains an entry for the data and 'Mensaje'
 * IMPORTANT: this option must be the empty string for some enpoints where the node for the resultName is missing
 */
export const parseSOAPResponse = <T extends GECROSBaseResponse>(
  xml: string,
  { actionName, resultName, rootResultName = 'DocumentElement' }: ParseSOAPOptions
): T => {
  // TODO better types for xml parser
  const parser = new XMLParser();
  const jsonObj = parser.parse(xml);
  const result = jsonObj?.['soap:Envelope']?.['soap:Body']?.[`${actionName}Response`]?.[`${actionName}Result`];
  if (!result) {
    throw new Error(`Malformed XML for ${actionName}\n ${xml}`);
  }
  const resultObj = parser.parse(result);
  const finalObj = resultObj?.[rootResultName]?.[resultName] || resultObj?.[rootResultName];
  // if (!finalObj) {
  //   throw new Error(`Malformed XML for ${resultName}\n ${xml}`);

  // }
  return finalObj;
};

export type OSAPResponse<T> = {
  [k: string]: T[];
};

export const changeTextInput =
  (setterFn: React.Dispatch<React.SetStateAction<string>>): InputChangeHandler =>
  (e) => {
    setterFn(e.target.value);
  };

export const changeCheckbox =
  (setterFn: React.Dispatch<React.SetStateAction<boolean>>): InputChangeHandler =>
  (e) => {
    setterFn(e.target.checked);
  };

export const changeTextArea =
  (setterFn: React.Dispatch<React.SetStateAction<string>>): TextAreaChangeHandler =>
  (e) => {
    setterFn(e.target.value);
  };

export const changeNumberInput =
  (setterFn: React.Dispatch<React.SetStateAction<number | ''>>): InputChangeHandler =>
  (e) => {
    setterFn(parseFloat(e.target.value));
  };

export const changeFileInput =
  (setterFn: React.Dispatch<React.SetStateAction<Array<File>>>): InputChangeHandler =>
  (e) => {
    const files = e.target.files && Array.from(e.target.files);
    setterFn(files || []);
  };

export const downloadFile = (linkSource: string, fileName: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  downloadFile(url, fileName);
};

export const downloadBase64File = (contentType: string, base64Data: string, fileName: string) => {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  downloadFile(linkSource, fileName);
};

export const capitalizeText = (text: string) => {
  return _.words(text)
    .map((word) => {
      return _.capitalize(word);
    })
    .join(' ');
};

export type ServiceFunction<T, U> = (...params: U[]) => Promise<ServiceResponse<T>>;
export function queryService<T, U>(serviceFn: ServiceFunction<T, U>, ...params: U[]) {
  return async () => {
    const { data, message } = await serviceFn(...params);
    if (message) {
      throw message;
    }
    return data;
  };
}

export const currentYear = new Date().getFullYear();

export const convertToLocaleDateString = (date: string) => {
  return new Date(date).toLocaleDateString('ES');
};

export const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  let months;
  if (Math.sign(m) >= 0) {
    months = m;
  } else {
    age -= 1;
    months = 12 + m;
  }

  return `${age} años ${months > 0 ? `${months} meses` : ''}`;
};
export function getEnumKeyByEnumValue<TEnumKey extends string, TEnumVal extends string | number>(
  myEnum: { [key in TEnumKey]: TEnumVal },
  enumValue: TEnumVal
): string {
  const keys = (Object.keys(myEnum) as TEnumKey[]).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : '';
}

export const defaultQueryOptions: QueryObserverOptions = {
  cacheTime: DEFAULT_CACHE_TIME,
  staleTime: DEFAULT_STALE_TIME,
};
