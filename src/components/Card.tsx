import { FC, PropsWithChildren } from "react";

interface CardProps {
  fullHeight?: boolean;
  maxHeight?: string;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ children, fullHeight, maxHeight }) => (
  <div
    className={`mx-auto p-6 border rounded-lg shadow-lg bg-white ${
      fullHeight ? "h-full" : ""
    }`}
    style={{
      maxHeight: maxHeight || 'none',
      overflowY: maxHeight ? 'auto' : 'visible',
    }}
  >
    {children}
  </div>
);

export default Card;
