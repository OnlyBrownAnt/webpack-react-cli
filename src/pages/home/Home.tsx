import React from "react";
import S from "@/pages/home/Home.module.css";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <div className={S.title}>
      <Link className={S.link} to="/redux">
        redux demo
      </Link>
    </div>
  );
};

export default Home;
