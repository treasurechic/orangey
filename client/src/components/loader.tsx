import React from "react";

export const Loader = ({
  classNames,
  noPadding,
}: {
  classNames?: string;
  noPadding?: boolean;
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        noPadding ? "" : "py-3"
      }`}
    >
      <div
        className={`animate-spin rounded-full h-20 w-20 border-b-2 border-red-700 ${classNames}`}
      />
    </div>
  );
};
