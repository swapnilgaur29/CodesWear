import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";

const LogoIcon = () => {
  return (
    <Link href="/">
      <span className="text-2xl">
        CodesWear Admin
      </span>
    </Link>
  );
};

export default LogoIcon;
