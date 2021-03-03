import React from "react";
import { DefaultButton } from "../Buttons/Buttons";
import "./Pagination.css";

const Pagination = ({ onClickPrevious, onClickNext }) => (
  <div className="Pagination">
    <DefaultButton
      background="black"
      disabled={!Boolean(onClickPrevious)}
      onClick={onClickPrevious}
    >
      {" < "}
    </DefaultButton>
    <DefaultButton
      background="black"
      disabled={!Boolean(onClickNext)}
      onClick={onClickNext}
    >
      {" > "}
    </DefaultButton>
  </div>
);

export default Pagination;
