interface CardTitleProps {
    children: React.ReactNode;
}

export const CardTitle = ({ children }: CardTitleProps) => (
    <div className="font-semibold text-lg">{children}</div>
);
