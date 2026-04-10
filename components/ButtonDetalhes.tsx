import Link from "next/link"

type Props = {
    id: number,
}

export default function ButtonDetalhes({ id }: Props) {
    return (
        <Link href={`/products/${id}`}>Detalhes</Link>
    )
}