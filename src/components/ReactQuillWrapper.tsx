// components/ReactQuillWrapper.tsx
import React, { forwardRef } from "react";
import ReactQuill from "react-quill-new";

const ReactQuillWrapper = forwardRef<ReactQuill, ReactQuill.ReactQuillProps>(
  (props, ref) => {
    return <ReactQuill ref={ref} {...props} />;
  }
);

ReactQuillWrapper.displayName = "ReactQuillWrapper";

export default ReactQuillWrapper;
