import { useRef, useEffect } from 'react';

export default function usePrevious(value, initialValue=null) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}