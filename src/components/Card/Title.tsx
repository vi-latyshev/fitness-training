interface CardTitleProps {
    children: React.ReactNode;
}

export const CardTitle = ({ children }: CardTitleProps) => (
    <div className="text-primary font-semibold text-lg">{children}</div>
);
