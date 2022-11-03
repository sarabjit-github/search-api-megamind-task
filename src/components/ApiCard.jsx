import React from "react";
import styles from "../styles/apicard.module.css";
import utilStyles from "../styles/utils.module.css";

export const ApiCard = ({ name, desc, https, link }) => {
  return (
    <div className={styles.apiCard}>
      <div>
        <h1 className={utilStyles.headingLg}>{name}</h1>
        <p>{desc}</p>
      </div>
      <div>
        <p>
          HTTPS: <span>{https === true ? "True" : "False"}</span>
        </p>
        <a href={link} target="_blank" rel="noreferrer">
          <button>View API</button>
        </a>
      </div>
    </div>
  );
};
