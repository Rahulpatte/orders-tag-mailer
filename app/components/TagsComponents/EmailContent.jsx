import React, { useEffect } from 'react';
import { useRef } from 'react';


export default function EmailContent({ content }) {

  const ref = useRef()

  useEffect(() => {
    console.log("lll",content)
      ref.current.innerHTML = content;
  }, [content])

  return (
    <div ref={ref} />
  );
}
