import React from "react";
import {Spinner} from "@nextui-org/react";

export default function LoadingSpinner() {
  return (
    <>
    <div className="flex pt-10 gap-4 w-full place-content-center">
      <Spinner color="default"/>
      <Spinner color="primary"/>
      <Spinner color="secondary"/>
      <Spinner color="success"/>
      <Spinner color="warning"/>
      <Spinner color="danger"/>
    </div> 
    </>
  );
}
