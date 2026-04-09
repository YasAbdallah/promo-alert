import React from "react";

type TitleProps = {
    children: React.ReactNode,
}

export function Title({ children }: TitleProps) {
    return (
        <h1 className="text-3xl font-bold mb-4">{children}</h1>
    );
}