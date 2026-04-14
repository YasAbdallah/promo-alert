import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

type PropsImage = {
    product: {
        title: string;
        images: string[];
    }
}

export default function CarrouselImage({ product }: PropsImage) {
    return (
        <div className="w-full max-w-md mx-auto">
            <Carousel className="relative w-full">

                <CarouselContent>
                    {product.images.map((image: string, index: number) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">

                                <Image
                                    src={image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                                />

                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Botão anterior */}
                <CarouselPrevious className="left-2 bg-background/80 backdrop-blur hover:bg-background shadow-sm" />

                {/* Botão próximo */}
                <CarouselNext className="right-2 bg-background/80 backdrop-blur hover:bg-background shadow-sm" />

            </Carousel>
        </div>
    );
}