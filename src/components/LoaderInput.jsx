import React from "react";

import css from "../../assets/input.module.scss";

const LoaderInput = ({
    name,
  url,
  placeholder,
  accept,
  className,
  margin,
  inputRef,
  onDrop,
  onDragOver,
  onDeleteValue,
  onChangeInput
}) => {
    return (
        <>
          <div
            className={`${css.container} ${url ? css.focus : ""} ${
              margin === "normal" ? css.margin : ""
            } ${className}`}
            draggable="true"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {url && (
              <svg
                onClick={onDeleteValue}
                className={`${css.icon} ${css.delete} ${css.focus}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="18px"
                height="18px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
              </svg>
            )}
            <label className={`${css.box}`} htmlFor={`id-${name}`}>
              {url && <img className={`${css.box__image}`} src={url} alt="" />}
              <svg
                className={`${css.icon} ${css.upload} ${url ? css.focus : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="40px"
                height="40px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z" />
              </svg>
              <span>{placeholder}</span>
            </label>
          </div>
          <input
            ref={inputRef}
            className={`${css.input}`}
            accept={accept}
            type="file"
            id={`id-${name}`}
            name={name}
            onChange={onChangeInput}
          />
        </>
      );

}

export default LoaderInput