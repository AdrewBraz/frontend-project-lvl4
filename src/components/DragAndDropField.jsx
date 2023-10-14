import React, { useState, useEffect, useRef } from "react";


import LoaderInput from "./LoaderInput";

const DragAndDropField = ({
  margin,
  placeholder,
  accept,
  className,
  form,
  field
}) => {
  const input = useRef();
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
      if (field.value && new URL(field.value)) {
        setUrl(field.value);
      }
      if(field.value.length === 0){
        handleDeleteValue()
      }
    } catch (error) {}
  }, [field.value]);

  const loadFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
      form.setFieldValue(field.name, file);
      input.current.value = "";
    };
    reader.readAsDataURL(file);
  }

  const removeDragData = (e) => {
    if (e.dataTransfer.items) {
      e.dataTransfer.items.clear();
      return;
    }
    e.dataTransfer.clearData();
  }

  const handleChange = (e) => {
    e.persist();
    console.log(e)
    if (e.target.files.length > 0) {
      loadFile(e.target.files[0]);
    }
  }

  const handleOnDrop = (e) => {
    e.persist();
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (let item of e.dataTransfer.items) {
        if (item.kind === "file") {
          loadFile(item.getAsFile());
        }
      }
    } else if (e.dataTransfer.files.length > 0) {
      loadFile(e.dataTransfer.files[0]);
    }

    removeDragData(e);
  }

  const handleOnDragOver = (e) => {
    e.persist();
    e.preventDefault();
  }

  const handleDeleteValue = () => {
    setUrl(null);
    form.setFieldValue(field.name, null);
  }

  return (
    <LoaderInput
      name={field.name}
      url={url}
      placeholder={placeholder}
      accept={accept}
      className={className}
      margin={margin}
      inputRef={input}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDeleteValue={handleDeleteValue}
      onChangeInput={handleChange}
    />
  );
}

export default DragAndDropField;
