import { ReactNode } from "react";
import Header from "./Header";

interface IProps {
  children?: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="container">
      <Header />
      {children}
      <footer className="footer"></footer>
    </div>
  );
};

export default CommonLayout;
