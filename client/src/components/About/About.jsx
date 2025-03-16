import React from "react";
import style from "./about.module.css";

function About() {
  return (
    <section className={style.outer_about_wrapper}>
      <section className={style.inner_container}>
        <div className={style.about}>
          <p>About</p>
        </div>

        <div>
          <h1>Evangadi Networks Q&A</h1>
        </div>

        <div className={style.paragraph_container}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio,
            consectetur praesentium repellendus autem eum ratione maiores alias
            nihil ea harum voluptatum omnis saepe a voluptate dicta nesciunt
            cumque animi fugit.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio,
            consectetur praesentium repellendus autem eum ratione maiores alias
            nihil ea harum voluptatum omnis saepe a voluptate dicta nesciunt
            cumque animi fugit.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio,
            consectetur praesentium repellendus autem eum ratione maiores alias
            nihil ea harum voluptatum omnis saepe a voluptate dicta nesciunt
            cumque animi fugit.
          </p>
        </div>

        <div>
          <a href="how-it-works" target="_blank">
            <button className={style.about_btn}>How it works</button>
          </a>
        </div>
      </section>
    </section>
  );
}

export default About;
