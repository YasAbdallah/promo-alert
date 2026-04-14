type Props = {
  children: React.ReactNode,
  title: string,
}

export default function ProductListLayout({ children, title }: Props) {
  return (
    <section>
        <h1 className="">{title}</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </section>
    </section>
  );
}