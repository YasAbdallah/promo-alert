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

export default function CarrouselImage({ product }: PropsImage){
    return(
        <Carousel>
                <CarouselContent>
                    {product.images.map((image, index) =>(
                        <CarouselItem key={index}>
                            <Image src={image} alt={product.title} width={400} height={300} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    );
}