export default function ProductListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
        <h1>Produtos: </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </section>
    </section>
  );
}