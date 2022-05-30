import React from "react";
import { ReactComponent as ErrorSvg } from "../app_photos/error-icon.svg";
import { ReactComponent as CorrectSvg } from "../app_photos/correct-icon.svg";

export function ShowPasswordMsg(props) {
  return props.match ? (
    <div className="text-success">
      <CorrectSvg height="24" width="24" /> {props.text}
    </div>
  ) : (
    <div className="text-danger ">
      <ErrorSvg height="18" width="18" /> {props.text}
    </div>
  );
}
